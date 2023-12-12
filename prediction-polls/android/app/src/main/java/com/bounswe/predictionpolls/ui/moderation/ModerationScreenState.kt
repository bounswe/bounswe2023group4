package com.bounswe.predictionpolls.ui.moderation

data class ModerationScreenState(
    val tags: List<String> = emptyList(),
    val requestedPolls: List<RequestedPoll> = emptyList(),
) {
    companion object {
        val DUMMY = ModerationScreenState(
            tags = listOf("tag1", "tag2", "tag3"),
            requestedPolls = listOf(
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 1",
                    tags = listOf("tag1", "tag2")
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 2",
                    tags = listOf("tag1", "tag2")
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 3"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 4",
                    tags = listOf("tag1", "tag2")
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 5"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 6"
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 7"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 8"
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 9"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 10"
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 11"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 12"
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 13"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 14"
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 15"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 16"
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 17"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 18"
                ),
                RequestedPoll(
                    type = RequestedPollType.REPORT,
                    question = "Question 19"
                ),
                RequestedPoll(
                    type = RequestedPollType.END,
                    question = "Question 20"
                ),
            )
        )
    }

    data class RequestedPoll(
        val type: RequestedPollType,
        val question: String,
        val tags: List<String> = emptyList()
    )

    enum class RequestedPollType {
        REPORT,
        END
    }

    fun reduce(event: ModerationScreenEvent): ModerationScreenState {
        return when (event) {
            else -> this
        }
    }
}
