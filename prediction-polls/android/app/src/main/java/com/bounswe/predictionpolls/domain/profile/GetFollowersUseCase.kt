package com.bounswe.predictionpolls.domain.profile

import javax.inject.Inject

class FollowUnfollowUseCase @Inject constructor(private val profileInfoRepository: ProfileInfoRepository) {
    suspend fun getFollowers(userId: String) = profileInfoRepository.fetchFollowers(userId)
    suspend fun getFollowed(userId: String) = profileInfoRepository.fetchFollowed(userId)
    suspend fun followUser(followerId: String, followedId: String) = profileInfoRepository.followUser(followerId, followedId)
    suspend fun unfollowUser(followerId: String, followedId: String) = profileInfoRepository.unfollowUser(followerId, followedId)
}