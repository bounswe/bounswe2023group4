package com.bounswe.predictionpolls.data.remote.model.response

import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll
import com.google.gson.annotations.SerializedName

data class ModeratorRequestResponse(
    @SerializedName("request_id")
    val requestId: Int,
    @SerializedName("request_type")
    val requestType: String,
    @SerializedName("poll")
    val poll: Poll
) {
    data class Poll(
        @SerializedName("id")
        val id: Int,
        @SerializedName("question")
        val question: String,
        @SerializedName("tags")
        val tags: List<String>,
        @SerializedName("creatorName")
        val creatorName: String,
        @SerializedName("creatorUsername")
        val creatorUsername: String,
        @SerializedName("creatorImage")
        val creatorImage: String?,
        @SerializedName("pollType")
        val pollType: String,
        @SerializedName("closingDate")
        val closingDate: String,
        @SerializedName("rejectVotes")
        val rejectVotes: String,
        @SerializedName("isOpen")
        val isOpen: Boolean,
        @SerializedName("comments")
        val comments: List<Comment>,
        @SerializedName("options")
        val options: List<Option>
    ) {
        data class Comment(
            @SerializedName("id")
            val id: Int,
            @SerializedName("content")
            val content: String
        ) {
            fun toComment(): ModeratorPoll.Poll.Comment {
                return ModeratorPoll.Poll.Comment(
                    id = this.id,
                    content = this.content
                )
            }
        }

        data class Option(
            @SerializedName("id")
            val id: Int,
            @SerializedName("choice_text")
            val choiceText: String,
            @SerializedName("poll_id")
            val pollId: Int,
            @SerializedName("voter_count")
            val voterCount: Int
        ) {
            fun toOption(): ModeratorPoll.Poll.Option {
                return ModeratorPoll.Poll.Option(
                    id = this.id,
                    choiceText = this.choiceText,
                    pollId = this.pollId,
                    voterCount = this.voterCount
                )
            }
        }

        fun toPoll(): ModeratorPoll.Poll {
            return ModeratorPoll.Poll(
                id = this.id,
                question = this.question,
                tags = this.tags,
                creatorName = this.creatorName,
                creatorUsername = this.creatorUsername,
                creatorImage = this.creatorImage,
                pollType = this.pollType,
                closingDate = this.closingDate,
                rejectVotes = this.rejectVotes,
                isOpen = this.isOpen,
                comments = this.comments.map { it.toComment() },
                options = this.options.map { it.toOption() }
            )
        }
    }

    fun toModeratorPoll(): ModeratorPoll {
        return ModeratorPoll(
            requestId = this.requestId,
            requestType = when (this.requestType) {
                "report" -> ModeratorPoll.RequestType.REPORT
                "discrete" -> ModeratorPoll.RequestType.DISCRETE
                else -> ModeratorPoll.RequestType.CONTINUOUS
            },
            poll = this.poll.toPoll()
        )
    }
}