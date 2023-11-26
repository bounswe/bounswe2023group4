package com.bounswe.predictionpolls.repo

import com.bounswe.predictionpolls.data.remote.repositories.PollRepositoryInterface

class FakePollRepository: PollRepositoryInterface {
    override suspend fun createContinuousPoll(
        question: String,
        openVisibility: Boolean,
        setDueDate: Boolean,
        dueDatePoll: String?,
        numericFieldValue: Int?,
        selectedTimeUnit: String,
        pollType: String
    ) {
        // Do nothing
    }

    override suspend fun createDiscretePoll(
        question: String,
        choices: List<String>,
        openVisibility: Boolean,
        setDueDate: Boolean,
        dueDatePoll: String?,
        numericFieldValue: Int?,
        selectedTimeUnit: String
    ) {
        // Do nothing
    }
}