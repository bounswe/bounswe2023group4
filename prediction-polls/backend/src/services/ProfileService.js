const db = require("../repositories/ProfileDB.js");
const authDb = require("../repositories/AuthorizationDB.js");


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
        res.status(200).json(profile);
    }catch(error){
        return res.status(400).json({error:error});
    }
}

async function addProfile(req,res){
    const {userId,username,email,profile_picture,biography, birthday, isHidden} = req.body;
    try{
        const result = await authDb.findUser({userId,username,email})
        if(result.error){
            throw result.error;
        }
        const {profile_id,error} = await db.addProfile({userId:result.id,username:result.username,email:result.email,profile_picture,biography, birthday, isHidden});
        if(error){
            throw error;
        }
        return res.status(200).json({profileId:profile_id});
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
        return res.status(200).json({status:status});
    }catch(error){
        return res.status(400).json({error:error});
    }
}

module.exports = {getProfile,getProfileWithProfileId,addProfile,updateProfile}