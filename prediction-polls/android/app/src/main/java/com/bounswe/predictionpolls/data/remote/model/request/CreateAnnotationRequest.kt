package com.bounswe.predictionpolls.data.remote.model.request

import com.google.gson.annotations.SerializedName

data class CreateAnnotationRequest(
    @SerializedName("@context")
    val context: String,
    val target: Target,
    val type: String,
    val creator: String,
    val body: Body,
) {
    data class Target(
        val selector: Selector,
        val source: String
    )

    data class Selector(
        val type: String,
        val exact: String,
        val prefix: String,
        val suffix: String,
    )

    data class Body(
        val format: String,
        val type: String,
        val value: String
    )
}
