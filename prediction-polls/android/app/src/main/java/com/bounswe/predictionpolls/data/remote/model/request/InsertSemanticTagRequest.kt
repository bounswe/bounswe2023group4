package com.bounswe.predictionpolls.data.remote.model.request

data class InsertSemanticTagRequest(
    val pollId: Int,
    val semanticTag: String,
)