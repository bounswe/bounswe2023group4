package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.core.BaseRepository
import com.bounswe.predictionpolls.data.remote.model.request.CreateContinuousPollRequest
import com.bounswe.predictionpolls.data.remote.model.request.CreateDiscretePollRequest
import com.bounswe.predictionpolls.data.remote.model.request.PollCommentRequest
import com.bounswe.predictionpolls.data.remote.services.PollService
import com.bounswe.predictionpolls.domain.poll.Comment

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

    override suspend fun reportPoll(pollId: String) {
        execute {
            pollService.reportPoll(pollId)
        }
    }

    override suspend fun postComment(pollId: Int, comment: String) {
        execute {
            val request  = PollCommentRequest(comment)
            pollService.commentPoll(pollId, request)
        }
    }

    override suspend fun getComments(pollId: Int): List<Comment> {
        return execute {
            pollService.getPollComments(pollId).map { it.toComment() }
        }
    }
}