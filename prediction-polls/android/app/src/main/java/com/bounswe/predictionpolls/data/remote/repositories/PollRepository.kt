package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.core.BaseRepository
import com.bounswe.predictionpolls.data.remote.model.request.CreateContinuousPollRequest
import com.bounswe.predictionpolls.data.remote.model.request.CreateDiscretePollRequest
import com.bounswe.predictionpolls.data.remote.services.PollService

class PollRepository(
    private val pollService: PollService
): BaseRepository(), PollRepositoryInterface  {
    override suspend fun createContinuousPoll(
        question: String,
        openVisibility: Boolean,
        setDueDate: Boolean,
        dueDatePoll: String?,
        numericFieldValue: Int?,
        selectedTimeUnit: String,
        pollType: String,
    ){
        val request = CreateContinuousPollRequest(
            question,
            openVisibility,
            setDueDate,
            dueDatePoll,
            numericFieldValue,
            selectedTimeUnit,
            pollType
        )
        execute {
            pollService.createContinuousPoll(request)
        }
    }

    override suspend fun createDiscretePoll(
        question: String,
        choices: List<String>,
        openVisibility: Boolean,
        setDueDate: Boolean,
        dueDatePoll: String?,
        numericFieldValue: Int?,
        selectedTimeUnit: String
    ){
        val request = CreateDiscretePollRequest(
            question,
            choices,
            openVisibility,
            setDueDate,
            dueDatePoll,
            numericFieldValue,
            selectedTimeUnit,
        )

        execute {
            pollService.createDiscretePoll(request)
        }
    }
}