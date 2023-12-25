package com.bounswe.predictionpolls.data.remote.model.response

import com.bounswe.predictionpolls.domain.poll.Comment
import com.google.gson.annotations.SerializedName

data class GetCommentResponse(
    @SerializedName("comment_id")
    val commentId: Int,
    @SerializedName("user_id")
    val userId: Int,
    @SerializedName("poll_id")
    val pollId: Int,
    @SerializedName("comment_text")
    val commentText: String,
    @SerializedName("commented_at")
    val commentedAt: String,
){
    fun toComment(): Comment{
        return Comment(
            commentId,
            userId,
            pollId,
            commentText,
            commentedAt
        )
    }
}