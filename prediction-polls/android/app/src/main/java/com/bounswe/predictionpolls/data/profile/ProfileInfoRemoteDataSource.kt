package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.profile.model.ProfileInfoResponse

interface ProfileInfoRemoteDataSource {

    suspend fun fetchProfileInfo(username: String): Result<ProfileInfoResponse>
    suspend fun fetchCurrentUserProfileInfo(): Result<ProfileInfoResponse>

    suspend fun followUser(followerId: String, followedId: String): Result<Unit>
    suspend fun unfollowUser(followerId: String, followedId: String): Result<Unit>
    suspend fun fetchFollowers(userId: String): Result<List<String>>
    suspend fun fetchFollowed(userId: String): Result<List<String>>
}