package com.bounswe.predictionpolls.domain.profile

import com.bounswe.predictionpolls.common.Result

interface ProfileInfoRepository {
    suspend fun getProfileInfo(username: String): Result<ProfileInfo>
    suspend fun getCurrentUserProfileInfo(): Result<ProfileInfo>

    suspend fun followUser(followerId: String, followedId: String): Result<Unit>

    suspend fun unfollowUser(followerId: String, followedId: String): Result<Unit>

    suspend fun fetchFollowers(userId: String): Result<List<String>>

    suspend fun fetchFollowed(userId: String): Result<List<String>>
}