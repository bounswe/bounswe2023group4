package com.bounswe.predictionpolls.data.feed.model


import com.bounswe.predictionpolls.domain.poll.ContinuousVoteInputType
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.poll.PollOption
import com.google.gson.*
import com.google.gson.annotations.SerializedName
import com.google.gson.reflect.TypeToken
import kotlinx.collections.immutable.toImmutableList
import java.lang.reflect.Type

data class PollResponse(
    val id: Int,
    val question: String,
    val tags: List<String>,
    val creatorName: String,
    val creatorUsername: String,
    val creatorImage: String?,
    val pollType: String,
    val rejectVotes: String?,
    val setDueDate: Int,
    val closingDate: String?,
    val isOpen: Int,
    @SerializedName("cont_poll_type")
    val contPollType: String?,
    val options: List<Any> // This can be a mix of Option and Int, handled during deserialization
) {
    data class Option(
        val id: Int,
        @SerializedName("choice_text")
        val choiceText: String,
        @SerializedName("poll_id")
        val pollId: Int,
        @SerializedName("voter_count")
        val voterCount: Int
    )


    /**
     * Converts the [PollResponse] to [Poll]. Throws [IllegalArgumentException] if the poll type is unknown
     */
    fun toPollDomainModel(): Poll =
        when (pollType) {
            "continuous" -> {
                Poll.ContinuousPoll(
                    creatorProfilePictureUri = creatorImage,
                    dueDate = closingDate,
                    pollCreatorName = creatorName,
                    pollQuestionTitle = question,
                    rejectionText = rejectVotes,
                    commentCount = 0,
                    tags = tags,
                    inputType = when (contPollType) {
                        "numeric" -> ContinuousVoteInputType.Decimal
                        "date" -> ContinuousVoteInputType.Date
                        else -> ContinuousVoteInputType.Text
                    }
                )
            }

            "discrete" -> {
                val options = options.map {
                    val option = it as Option
                    PollOption.DiscreteOption(
                        id = option.id.toString(),
                        text = option.choiceText,
                        voteCount = option.voterCount
                    )
                }
                Poll.DiscretePoll(
                    creatorProfilePictureUri = creatorImage,
                    dueDate = closingDate,
                    pollCreatorName = creatorName,
                    pollQuestionTitle = question,
                    rejectionText = rejectVotes,
                    commentCount = 0,
                    tags = tags,
                    options = options.toImmutableList()
                )
            }

            else -> {
                throw IllegalArgumentException("Unknown poll type: $pollType")
            }
        }
}

class PollResponseDeserializer : JsonDeserializer<PollResponse> {
    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): PollResponse {
        val jsonObject = json.asJsonObject
        val id = jsonObject.get("id").asInt
        val question = jsonObject.get("question").asString
        val tags = context.deserialize<List<String>>(
            jsonObject.get("tags"),
            object : TypeToken<List<String>>() {}.type
        )
        val creatorName = jsonObject.get("creatorName").asString
        val creatorUsername = jsonObject.get("creatorUsername").asString
        val creatorImage = jsonObject.get("creatorImage")?.asString
        val pollType = jsonObject.get("pollType").asString
        val rejectVotes = jsonObject.get("rejectVotes").asString
        val setDueDate = jsonObject.get("setDueDate").asInt
        val closingDate = jsonObject.get("closingDate")?.asString
        val isOpen = jsonObject.get("isOpen").asInt
        val contPollType = jsonObject.get("cont_poll_type")?.asString
        val optionsJson = jsonObject.get("options").asJsonArray
        val options = mutableListOf<Any>()
        if (pollType == "continuous") {
            options.addAll(
                context.deserialize<List<String>>(
                    optionsJson,
                    object : TypeToken<List<Int>>() {}.type
                )
            )
        } else {
            options.addAll(
                context.deserialize<List<PollResponse.Option>>(
                    optionsJson,
                    object : TypeToken<List<PollResponse.Option>>() {}.type
                )
            )
        }

        return PollResponse(
            id,
            question,
            tags,
            creatorName,
            creatorUsername,
            creatorImage,
            pollType,
            rejectVotes,
            setDueDate,
            closingDate,
            isOpen,
            contPollType,
            options
        )
    }
}


