package com.bounswe.predictionpolls.domain.moderation

data class ModeratorPoll(
    val requestId: Int,
    val requestType: String,
    val poll: Poll
) {
    data class Poll(
        val id: Int,
        val question: String,
        val tags: List<String>,
        val creatorName: String,
        val creatorUsername: String,
        val creatorImage: String,
        val pollType: String,
        val closingDate: String,
        val rejectVotes: String,
        val isOpen: Boolean,
        val contPollType: String,
        val comments: List<Comment>,
        val options: List<Option>
    ) {
        data class Comment(
            val id: Int,
            val content: String
        )

        data class Option(
            val id: Int,
            val choiceText: String,
            val pollId: Int,
            val voterCount: Int
        )
    }
}