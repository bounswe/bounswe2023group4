package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.domain.poll.Comment
import com.bounswe.predictionpolls.domain.poll.Poll

interface PollRepositoryInterface {
    /**
     * Creates a continuous poll and returns the result.
     */
    suspend fun createContinuousPoll(
        question: String,
        openVisibility: Boolean,
        setDueDate: Boolean,
        dueDatePoll: String? = null,
        numericFieldValue: Int? = null,
        selectedTimeUnit: String,
        pollType: String,
    ): Int

    /**
     * Creates a discrete poll and returns the result.
     */
    suspend fun createDiscretePoll(
        question: String,
        choices: List<String>,
        openVisibility: Boolean,
        setDueDate: Boolean,
        dueDatePoll: String? = null,
        numericFieldValue: Int? = null,
        selectedTimeUnit: String
    ): Int

    suspend fun reportPoll(
        pollId: String
    )

    suspend fun postComment(
        pollId: Int,
        comment: String
    )

    suspend fun getComments(
        pollId: Int
    ): List<Comment>

    suspend fun getOpenedPolls(
        username: String,
    ): List<Poll>

    suspend fun getOpenedPollsForMe(): List<Poll>
}