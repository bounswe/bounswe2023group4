const db = require("../repositories/ProfileDB.js");


async function getProfile(req,res){
    const { userId, username, email } = req.query;
    if(userId){
        console.log("Found UserId");
        const profile = await db.getProfileWithUserId(userId);
        return res.status(200).json(profile);
    }
    console.log("Did not find UserId");
    const profile = await db.getProfileWithUserInfo({username,email})
    res.status(200).json(profile);
}

async function getProfileWithProfileId(req,res){
    const profileId = req.params.profileId;
    const {profile,error} = await db.getProfileWithProfileId(profileId);
    if(error){
        return res.status(400).json({error:error});
    }
    res.status(200).json(profile);
}

async function addProfile(req,res){
    const {userId,username,email,profile_picture,biography, birthday, isHidden} = req.body;
    const {profile_id,error} = await db.addProfile({userId,username,email,profile_picture,biography, birthday, isHidden});
    if(error){
        return res.status(400).json({error:error});
    }
    return res.status(200).json({profileId:profile_id});
}

async function updateProfile(req,res){
    const {userId,username,profile_picture,biography, birthday, isHidden} = req.body;
    const {status,error} = await db.updateProfile({userId,username,profile_picture,biography, birthday, isHidden});
    if(error){
        return res.status(400).json({error:error});
    }
    return res.status(200).json({status:status});
}

module.exports = {getProfile,getProfileWithProfileId,addProfile,updateProfile}