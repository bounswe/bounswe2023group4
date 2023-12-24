package com.bounswe.predictionpolls.data.remote.model.request

import com.google.gson.annotations.SerializedName

data class ModeratorRequest(
    @SerializedName("request_id")
    val requestId: Int,
    val choice: Any
)