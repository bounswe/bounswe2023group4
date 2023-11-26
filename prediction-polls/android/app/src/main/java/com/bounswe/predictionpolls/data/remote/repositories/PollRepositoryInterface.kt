package com.bounswe.predictionpolls.data.remote.repositories

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
    )

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
    )
}