package com.bounswe.predictionpolls.domain.annotation

sealed class PollAnnotationPages {
    data class PROFILE(val username: String): PollAnnotationPages()
    data class VOTE(val pollId: Int): PollAnnotationPages()

    fun toSource(
        frontEndUrl: String,
    ): String {
        return when(this) {
            is VOTE -> "$frontEndUrl/vote/${pollId}"
            is PROFILE -> "$frontEndUrl/profile/${username}"
        }
    }
}