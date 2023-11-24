const db = require("../repositories/ProfileDB.js");
const authDb = require("../repositories/AuthorizationDB.js");
const {S3Client,PutObjectCommand,GetObjectCommand} = require('aws-sdk');
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  })


async function getImagefromS3(imageName){
    const params = {
        Bucket: bucketName,
        Key: imageName
      }
    
      const command = new GetObjectCommand(params);
      const seconds = 60
      const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
    
      return url
}

async function uploadImagetoS3(req,res){
    const userId = req.user.id;
    const file = req.file
    const caption = req.body.caption
    const imageName = generateFileName()

    const fileBuffer = req.file.buffer
    
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: imageName,
        ContentType: req.file.mimetype
    }
      
    await s3Client.send(new PutObjectCommand(uploadParams));

    await db.updateProfile({userId,profile_picture:imageName});
}



async function getProfile(req,res){
    const {userId, username, email} = req.query;
    try{
        const result = await authDb.findUser({userId,username,email})
        if(result.error){
            throw result.error;
        }
    
        const {profile,error} = await db.getProfileWithUserId(result.id);
        if(error){
            throw error;
        }

        if(profile.profile_picture){
            profile.profile_picture = await getImagefromS3(profile.profile_picture);
        }

        const {badges,error:badge_error} = await db.getBadges(result.id);
        if(badge_error){
            throw badge_error;
        }
        profile.badges = badges;

        return res.status(200).json(profile);
        
    }catch(error){
        return res.status(400).json({error:error});
    }
}

async function getProfileWithProfileId(req,res){
    const profileId = req.params.profileId;
    try{
        const {profile,error} = await db.getProfileWithProfileId(profileId);
        if(error){
            throw error
        }

        const {badges,error:badge_error} = await db.getBadges(result.id);
        if(badge_error){
            throw badge_error;
        }
        profile.badges = badges;

        res.status(200).json(profile);
    }catch(error){
        return res.status(400).json({error:error});
    }
}

async function getMyProfile(req,res){
    const userId = req.user.id;
    try{
        const result = await authDb.findUser({userId})
        if(result.error){
            throw result.error;
        }
    
        const {profile,error} = await db.getProfileWithUserId(result.id);
        if(error){
            throw error;
        }
        return res.status(200).json(profile);
        
    }catch(error){
        return res.status(400).json({error:error});
    }
}

async function updateProfile(req,res){
    const {userId,username,email,profile_picture,biography, birthday, isHidden} = req.body;

    try{
        const result = await authDb.findUser({userId,username,email})
        if(result.error){
            throw result.error;
        }
        const {status,error} = await db.updateProfile({userId:result.id,profile_picture,biography, birthday, isHidden});
        if(error){
            throw error;
        }

        const result_profile = await db.getProfileWithUserId(result.id);
        if(result_profile.error){
            throw result_profile.error;
        }

        return res.status(200).json(result_profile.profile);
    }catch(error){
        return res.status(400).json({error:error});
    }
}

module.exports = {getProfile,getProfileWithProfileId,getMyProfile,updateProfile,uploadImagetoS3}