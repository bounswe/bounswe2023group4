const db = require("../repositories/ProfileDB.js");
const authDb = require("../repositories/AuthorizationDB.js");
const crypto = require('crypto');
const aws = require('aws-sdk');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const errorCodes = require("../errorCodes.js");

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
});

const s3Client = new aws.S3();


async function getImagefromS3(imageName) {
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60 * 5 // Time in seconds
    };

    try {
        const signedUrl = await s3Client.getSignedUrl('getObject', params);

        return { signedUrl: signedUrl };
    } catch (error) {
        return { error: error };
    }
}

async function uploadImagetoS3(req, res) {
    const userId = req.user.id;
    const file = req.file
    const imageName = generateFileName()

    const fileBuffer = file.buffer

    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: imageName,
        ContentType: req.file.mimetype
    }

    try {
        await s3Client.putObject(uploadParams).promise();
        await db.updateProfile({ userId, profile_picture: imageName });
        res.status(200).send({ status: "Image uploaded successfully!" });
    } catch (error) {
        res.status(500).send({ error: error });
    }
}



async function getProfile(req, res) {
    const { userId, username, email } = req.query;
    try {
        const result = await authDb.findUser({ userId, username, email })
        if (result.error) {
            throw result.error;
        }

        const { profile, error } = await db.getProfileWithUserId(result.id);
        if (error) {
            throw error;
        }

        if (profile.profile_picture) {
            const image_result = await getImagefromS3(profile.profile_picture);
            if (image_result.error) {
                throw image_result.error;
            }
            profile.profile_picture = image_result.signedUrl;
        }

        const { badges, error: badge_error } = await db.getBadges(result.id);
        if (badge_error) {
            throw badge_error;
        }
        profile.isMod = result.isMod
        profile.badges = badges;
        profile.isMod = result.isMod;

        return res.status(200).json(profile);

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

async function getProfileWithProfileId(req, res) {
    const profileId = req.params.profileId;
    try {
        const { profile, error } = await db.getProfileWithProfileId(profileId);
        if (error) {
            throw error
        }

        if (profile.profile_picture) {
            const image_result = await getImagefromS3(profile.profile_picture);
            if (image_result.error) {
                throw image_result.error;
            }
            profile.profile_picture = image_result.signedUrl;
        }


        const { badges, error: badge_error } = await db.getBadges(profile.userId);

        if (badge_error) {
            throw badge_error;
        }
        profile.badges = badges;

        res.status(200).json(profile);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

async function getMyProfile(req, res) {
    const userId = req.user.id;
    try {
        const result = await authDb.findUser({ userId })
        if (result.error) {
            throw result.error;
        }

        const { profile, error } = await db.getProfileWithUserId(result.id);
        if (error) {
            throw error;
        }

        if (profile.profile_picture) {
            const image_result = await getImagefromS3(profile.profile_picture);
            if (image_result.error) {
                throw image_result.error;
            }
            profile.profile_picture = image_result.signedUrl;
        }

        const { badges, error: badge_error } = await db.getBadges(result.id);
        if (badge_error) {
            throw badge_error;
        }
        profile.isMod = result.isMod
        profile.badges = badges;
        profile.isMod = result.isMod;

        return res.status(200).json(profile);

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

async function updateProfile(req, res) {
    const { userId, username, email, profile_picture, biography, birthday, isHidden } = req.body;
    try {
        const result = await authDb.findUser({ userId, username, email })
        if (result.error) {
            throw result.error;
        }
        const { status, error } = await db.updateProfile({ userId: result.id, profile_picture, biography, birthday, isHidden });
        if (error) {
            throw error;
        }

        const result_profile = await db.getProfileWithUserId(result.id);
        if (result_profile.error) {
            throw result_profile.error;
        }

        return res.status(200).json(result_profile.profile);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}


async function updateBadge(req, res) {
    const userId = req.user.id;
    const { badgeId, isSelected } = req.body;

    if (badgeId == undefined || isSelected == undefined) {
        return res.status(400).json({ error: errorCodes.INSUFFICIENT_DATA });
    }

    try {
        const { badges, error } = await db.getBadges(userId);
        if (error) {
            throw error;
        }
        for (let i = 0; i < badges.length; i++) {
            if (badgeId == badges[i].id) {
                const badge_result = await db.updateBadge(badgeId, isSelected);
                if (badge_result.error) {
                    throw errorCodes.DATABASE_ERROR;
                }
                return res.status(200).json({ status: "success" });
            }
        }
        throw errorCodes.USER_DOES_NOT_HAVE_GIVEN_BADGE;
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

async function followProfiles(req, res) {
    const { follower_id, followed_id } = req.body;

    if (follower_id == undefined || followed_id == undefined) {
        return res.status(400).json({ error: errorCodes.INSUFFICIENT_DATA });
    }
    try {
        const { status, error } = await db.followProfile(follower_id, followed_id);
        if (error) {
            throw error;
        }
        return res.status(200).json({ status: status });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}
async function unfollowProfiles(req, res) {
    const { follower_id, followed_id } = req.body;
    
    if (follower_id == undefined || followed_id == undefined) {
        return res.status(400).json({ error: errorCodes.INSUFFICIENT_DATA });
    }
    try {
        const { status, error } = await db.unfollowProfile(follower_id, followed_id);
        if (error) {
            throw error;
        }
        return res.status(200).json({ status: status });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}
async function getFollowerProfiles(req, res) {
    const { userId } = req.body;

    if (userId == undefined) {
        return res.status(400).json({ error: errorCodes.INSUFFICIENT_DATA });
    }
    try {
        const { follower_list, error } = await db.followerProfiles(userId);
        if (error) {
            throw error;
        }
        return res.status(200).json({ followerList: follower_list });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}
async function getFollowedProfiles(req, res) {
    const { userId } = req.body;

    if (userId == undefined) {
        return res.status(400).json({ error: errorCodes.INSUFFICIENT_DATA });
    }
    try {
        const { followed_list, error } = await db.followedProfiles(userId);
        if (error) {
            throw error;
        }
        return res.status(200).json({ followedList: followed_list });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

async function getLeaderBoardRanking(req, res) {
    const topic = req.params.topic;

    if (topic == undefined) {
        return res.status(400).json({ error: errorCodes.INSUFFICIENT_DATA });
    }
    try {
        const { result, error } = await db.getRankPerTag(topic);
        if (error) {
            throw error;
        } 
        const userProfiles = await Promise.all(result.map(async (user) => {
            const { profile, profile_error } = await db.getProfileWithUserId(user.id);
            if (profile_error) {
                throw profile_error;
            }
            user.profile_picture = null
            if (profile.profile_picture) {
                const image_result = await getImagefromS3(profile.profile_picture);
                if (image_result.error) {
                    throw image_result.error;
                }
                user.profile_picture = image_result.signedUrl;
            }
            return user
        
        }))
        
        return res.status(200).json({ userList : userProfiles });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}


module.exports = { getProfile, getProfileWithProfileId, getMyProfile, updateProfile,getImagefromS3, uploadImagetoS3, updateBadge, followProfiles, unfollowProfiles, getFollowerProfiles, getFollowedProfiles, getLeaderBoardRanking }