package com.bounswe.predictionpolls.domain.poll

import com.bounswe.predictionpolls.common.Result
import javax.inject.Inject

class VotePollUseCase @Inject constructor(
    private val votePollRepository: VotePollRepository
) {

    suspend fun voteForDiscretePoll(pollId: String, points: Int, voteId: String): Result<Unit> {
        return votePollRepository.voteForDiscretePoll(pollId, points, voteId)
    }

    suspend fun voteForContinuousPoll(
        pollId: String,
        points: Int,
        voteInput: String
    ): Result<Unit> {
        return votePollRepository.voteForContinuousPoll(pollId, points, voteInput)
    }
}