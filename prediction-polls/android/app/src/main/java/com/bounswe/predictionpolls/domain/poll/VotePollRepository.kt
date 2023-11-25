package com.bounswe.predictionpolls.domain.poll

import com.bounswe.predictionpolls.common.Result

interface VotePollRepository {

    suspend fun voteForDiscretePoll(pollId: String, points: Int, voteId: String): Result<Unit>

    suspend fun fetchPoll(pollId: String): Result<Poll>
    suspend fun voteForContinuousPoll(pollId: String, points: Int, voteInput: String): Result<Unit>

}