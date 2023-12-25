package com.bounswe.predictionpolls.data.profile.model

import com.google.gson.annotations.SerializedName

data class FollowRequest(
    @SerializedName("follower_id")
    val followerId: Int,
    @SerializedName("followed_id")
    val followedId: Int
)
