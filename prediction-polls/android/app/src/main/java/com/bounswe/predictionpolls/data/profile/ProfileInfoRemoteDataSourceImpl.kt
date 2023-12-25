package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.profile.model.FollowRequest
import com.bounswe.predictionpolls.data.profile.model.GetFollowersRequest
import com.bounswe.predictionpolls.data.profile.model.ProfileInfoResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject

class ProfileInfoRemoteDataSourceImpl @Inject constructor(
    private val profileApi: ProfileApi
) : ProfileInfoRemoteDataSource {


    override suspend fun fetchProfileInfo(username: String): Result<ProfileInfoResponse> =
        withContext(Dispatchers.IO) {
            try {
                val response = profileApi.fetchProfileInfo(username)
                Result.Success(response)
            } catch (e: Exception) {
                Result.Error(e)
            }
        }

    override suspend fun fetchCurrentUserProfileInfo(): Result<ProfileInfoResponse> =
        withContext(Dispatchers.IO) {
            try {
                val response = profileApi.fetchCurrentUserProfileInfo()
                Result.Success(response)
            } catch (e: Exception) {
                Result.Error(e)
            }
        }

    override suspend fun followUser(followerId: String, followedId: String): Result<Unit> =
        withContext(Dispatchers.IO) {
            try {
                profileApi.followUser(
                    FollowRequest(
                        followerId.toIntOrNull() ?: -1,
                        followedId.toIntOrNull() ?: -1
                    )
                )
                Result.Success(Unit)
            } catch (e: Exception) {
                Result.Error(e)
            }
        }

    override suspend fun unfollowUser(followerId: String, followedId: String): Result<Unit> =
        withContext(Dispatchers.IO) {
            try {
                profileApi.unfollowUser(
                    FollowRequest(
                        followerId.toIntOrNull() ?: -1,
                        followedId.toIntOrNull() ?: -1
                    )
                )
                Result.Success(Unit)
            } catch (e: Exception) {
                Result.Error(e)
            }
        }

    override suspend fun fetchFollowers(userId: String): Result<List<String>> =
        withContext(Dispatchers.IO) {
            try {
                val followers =
                    profileApi.fetchFollowers(GetFollowersRequest(userId.toIntOrNull() ?: -1)).followerList ?: emptyList()
                Result.Success(followers)
            } catch (e: Exception) {
                Result.Error(e)
            }
        }

    override suspend fun fetchFollowed(userId: String): Result<List<String>> =
        withContext(Dispatchers.IO) {
            try {
                val followed =
                    profileApi.fetchFollowed(GetFollowersRequest(userId.toIntOrNull() ?: -1)).followerList ?: emptyList()
                Result.Success(followed)
            } catch (e: Exception) {
                Result.Error(e)
            }

        }

}

data class FollowerResponse(
    val followerList: List<String>?
)