package com.bounswe.predictionpolls.data.remote.model.request

import com.google.gson.annotations.SerializedName

data class PollCommentRequest(
    @SerializedName("commentText")
    val comment: String
)