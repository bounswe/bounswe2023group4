package com.bounswe.predictionpolls.data.remote.model.response

import com.bounswe.predictionpolls.domain.poll.Comment
import com.google.gson.annotations.SerializedName

data class GetCommentResponse(
    @SerializedName("username")
    val username: String,
    @SerializedName("comment_text")
    val commentText: String,
    @SerializedName("commented_at")
    val commentedAt: String,
){
    fun toComment(): Comment{
        return Comment(
            username,
            commentText,
            commentedAt
        )
    }
}