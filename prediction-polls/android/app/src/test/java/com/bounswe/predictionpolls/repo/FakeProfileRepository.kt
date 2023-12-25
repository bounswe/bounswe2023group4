package com.bounswe.predictionpolls.repo


import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.profile.ProfileInfo
import com.bounswe.predictionpolls.domain.profile.ProfileInfoRepository
import kotlinx.collections.immutable.persistentListOf

class FakeProfileInfoRepository : ProfileInfoRepository {

    private var shouldReturnError = false

    fun setReturnError(value: Boolean) {
        shouldReturnError = value
    }

    override suspend fun getProfileInfo(username: String): Result<ProfileInfo> {
        return if (!shouldReturnError) {
            Result.Success(
                ProfileInfo(
                    username = username,
                    userFullName = "Test User",
                    coverPhotoUri = "http://example.com/cover.jpg",
                    profilePictureUri = "http://example.com/profile.jpg",
                    userDescription = "This is a test user.",
                    badgeUris = persistentListOf("http://example.com/badge1.jpg"),
                    birthday = null,
                    isHidden = false,
                    userId = "132",
                    followedCount = 0,
                    followerCount = 0,
                )
            )
        } else {
            Result.Error(Exception("Fake error"))
        }
    }

    override suspend fun getCurrentUserProfileInfo(): Result<ProfileInfo> {
        throw Exception()
    }

    override suspend fun followUser(followerId: String, followedId: String): Result<Unit> {
        throw Exception()
    }

    override suspend fun unfollowUser(followerId: String, followedId: String): Result<Unit> {
        throw Exception()
    }

    override suspend fun fetchFollowers(userId: String): Result<List<String>> {
        throw Exception()
    }

    override suspend fun fetchFollowed(userId: String): Result<List<String>> {
        throw Exception()
    }
}
