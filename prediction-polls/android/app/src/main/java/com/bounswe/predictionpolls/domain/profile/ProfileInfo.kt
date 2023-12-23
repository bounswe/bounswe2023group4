package com.bounswe.predictionpolls.domain.profile

import kotlinx.collections.immutable.ImmutableList

data class ProfileInfo(
    val userId: String,
    val username: String,
    val userFullName: String,
    val followerCount: Int?,
    val followedCount: Int?,
    val coverPhotoUri: String?,
    val profilePictureUri: String?,
    val userDescription: String?,
    val badgeUris: ImmutableList<String>,
    val birthday: String?,
    val isHidden: Boolean?
)
