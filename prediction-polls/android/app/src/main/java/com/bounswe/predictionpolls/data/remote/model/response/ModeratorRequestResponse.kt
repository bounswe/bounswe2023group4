package com.bounswe.predictionpolls.data.remote.model.response

import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.JsonParseException
import com.google.gson.annotations.SerializedName
import com.google.gson.reflect.TypeToken
import java.lang.reflect.Type

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
        val options: List<Option>?,
        @SerializedName("cont_poll_type")
        val contPollType: String?
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
                options = this.options.orEmpty().map { it.toOption() },
                contPollType = this.contPollType
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

class ModeratorRequestPollDeserializer : JsonDeserializer<ModeratorRequestResponse.Poll> {
    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): ModeratorRequestResponse.Poll {
        val jsonObject = json.asJsonObject

        val id = jsonObject.get("id").asInt
        val question = jsonObject.get("question").asString
        val tags = context.deserialize(
            jsonObject.get("tags"),
            object : TypeToken<List<String>>() {}.type
        ) as List<String>
        val creatorName = jsonObject.get("creatorName").asString
        val creatorUsername = jsonObject.get("creatorUsername").asString
        val creatorImage = try {
            jsonObject.get("creatorImage").asString
        } catch (e: Exception) {
            null
        }
        val pollType = jsonObject.get("pollType").asString
        val closingDate = jsonObject.get("closingDate").asString
        val rejectVotes = jsonObject.get("rejectVotes").asString
        val isOpen = jsonObject.get("isOpen").asBoolean
        val comments = context.deserialize(
            jsonObject.get("comments"),
            object : TypeToken<List<ModeratorRequestResponse.Poll.Comment>>() {}.type
        ) as List<ModeratorRequestResponse.Poll.Comment>
        val contPollType = jsonObject.get("cont_poll_type")?.asString

        var options: List<ModeratorRequestResponse.Poll.Option> = emptyList()
        try {
            options = context.deserialize(
                jsonObject.get("options"),
                object : TypeToken<List<ModeratorRequestResponse.Poll.Option>>() {}.type
            ) as List<ModeratorRequestResponse.Poll.Option>
        } catch (e: JsonParseException) {
            // If deserialization fails, 'options' will remain null
        }

        return ModeratorRequestResponse.Poll(
            id = id,
            question = question,
            tags = tags,
            creatorName = creatorName,
            creatorUsername = creatorUsername,
            creatorImage = creatorImage,
            pollType = pollType,
            closingDate = closingDate,
            rejectVotes = rejectVotes,
            isOpen = isOpen,
            comments = comments,
            options = options,
            contPollType = contPollType
        )
    }
}