package com.bounswe.predictionpolls.domain.poll

data class Comment(
    val id: Int,
    val userId: Int,
    val pollId: Int,
    val comment: String,
    val date: String,
)