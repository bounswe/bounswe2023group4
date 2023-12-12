package com.bounswe.predictionpolls.data.feed.model


import com.bounswe.predictionpolls.common.PredictionPollsError
import com.bounswe.predictionpolls.domain.poll.ContinuousVoteInputType
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.poll.PollOption
import com.google.gson.*
import com.google.gson.annotations.SerializedName
import com.google.gson.reflect.TypeToken
import kotlinx.collections.immutable.toImmutableList
import java.lang.reflect.Type

data class PollResponse(
    @SerializedName("error")
    val predictionPollsError: PredictionPollsError?,
    val id: Int,
    val question: String,
    val tags: List<String>,
    val creatorName: String,
    val creatorUsername: String,
    val creatorImage: String?,
    val pollType: String,
    val rejectVotes: String?,
    val closingDate: String?,
    val isOpen: Boolean,
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
                    polId = id.toString(),
                    creatorProfilePictureUri = creatorImage,
                    dueDate = closingDate,
                    pollCreatorName = creatorName,
                    pollQuestionTitle = question,
                    rejectionText = rejectVotes,
                    commentCount = 0,
                    tags = tags,
                    pollCreatorUsername = creatorUsername,
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
                    polId = id.toString(),
                    creatorProfilePictureUri = creatorImage,
                    dueDate = closingDate,
                    pollCreatorName = creatorName,
                    pollQuestionTitle = question,
                    rejectionText = rejectVotes,
                    pollCreatorUsername = creatorUsername,
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
        val error = try {
            val errorJson = jsonObject.get("error").asJsonObject
            PredictionPollsError(
                errorJson.get("code").asString,
                errorJson.get("message").asString
            )
        } catch (e: Exception) {
            null
        }
        val id = jsonObject.get("id").asInt
        val question = jsonObject.get("question").asString
        val tags = context.deserialize<List<String>>(
            jsonObject.get("tags"),
            object : TypeToken<List<String>>() {}.type
        )
        val creatorName = jsonObject.get("creatorName").asString
        val creatorUsername =
            jsonObject.get("creatorUsername").asString


        val creatorImage = try {
            jsonObject.get("creatorImage").asString
        } catch (e: Exception) {
            null
        }
        val pollType = jsonObject.get("pollType").asString
        val rejectVotes = try {
            jsonObject.get("rejectVotes").asString
        } catch (e: Exception) {
            null
        }
        val closingDate = try {
            jsonObject.get("closingDate").asString
        } catch (e: Exception) {
            null
        }
        val isOpen = jsonObject.get("isOpen").asBoolean
        val contPollType = try {
            jsonObject.get("cont_poll_type")?.asString
        } catch (e: Exception) {
            null
        }
        val options = mutableListOf<Any>()
        if (pollType == "continuous") {
//            options.addAll(
//                context.deserialize<List<String>>(
//                    optionsJson,
//                    object : TypeToken<List<Int>>() {}.type
//                )
//            )
        } else {
            val optionsJson = jsonObject.get("options").asJsonArray
            options.addAll(
                context.deserialize<List<PollResponse.Option>>(
                    optionsJson,
                    object : TypeToken<List<PollResponse.Option>>() {}.type
                )
            )
        }

        return PollResponse(
            error,
            id,
            question,
            tags,
            creatorName,
            creatorUsername,
            creatorImage,
            pollType,
            rejectVotes,
            closingDate,
            isOpen,
            contPollType,
            options
        )
    }
}


