package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.core.BaseRepository
import com.bounswe.predictionpolls.data.remote.model.request.CreateContinuousPollRequest
import com.bounswe.predictionpolls.data.remote.model.request.CreateDiscretePollRequest
import com.bounswe.predictionpolls.data.remote.model.request.PollCommentRequest
import com.bounswe.predictionpolls.data.remote.services.PollService
import com.bounswe.predictionpolls.domain.poll.Comment
import com.bounswe.predictionpolls.domain.poll.Poll

class PollRepository(
    private val pollService: PollService
) : BaseRepository(), PollRepositoryInterface {
    override suspend fun createContinuousPoll(
        question: String,
        openVisibility: Boolean,
        setDueDate: Boolean,
        dueDatePoll: String?,
        numericFieldValue: Int?,
        selectedTimeUnit: String,
        pollType: String,
    ): Int {
        val request = CreateContinuousPollRequest(
            question,
            openVisibility,
            setDueDate,
            dueDatePoll,
            numericFieldValue,
            selectedTimeUnit,
            pollType
        )
        return execute {
            pollService.createContinuousPoll(request).newPollId
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
    ): Int {
        val request = CreateDiscretePollRequest(
            question,
            choices,
            openVisibility,
            setDueDate,
            dueDatePoll,
            numericFieldValue,
            selectedTimeUnit,
        )

        return execute {
            pollService.createDiscretePoll(request).newPollId
        }
    }

    override suspend fun reportPoll(pollId: String) {
        execute {
            pollService.reportPoll(pollId)
        }
    }

    override suspend fun postComment(pollId: Int, comment: String) {
        execute {
            val request = PollCommentRequest(comment)
            pollService.commentPoll(pollId, request)
        }
    }

    override suspend fun getComments(pollId: Int): List<Comment> {
        return execute {
            pollService.getPollComments(pollId).map { it.toComment() }
        }
    }

    override suspend fun getOpenedPolls(username: String): List<Poll> {
        return execute {
            pollService.getOpenedPolls(username).map { it.toPollDomainModel() }
        }
    }

    override suspend fun getOpenedPollsForMe(): List<Poll> {
        return execute {
            pollService.getOpenedPollsForMe().map { it.toPollDomainModel() }
        }
    }
}