package com.bounswe.predictionpolls.domain.profile

import kotlinx.collections.immutable.ImmutableList

data class ProfileInfo(
    val username: String,
    val userFullName: String,
    val coverPhotoUri: String?,
    val profilePictureUri: String?,
    val userDescription: String?,
    val badgeUris: ImmutableList<String>,
    val birthday: String?,
    val isHidden: Boolean?
)
