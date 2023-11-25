package com.bounswe.predictionpolls.data.vote

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.remote.services.PollService
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.poll.VotePollRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject

class VotePollRepositoryImpl @Inject constructor(
    private val votePollApi: PollService
) : VotePollRepository {

    override suspend fun fetchPoll(pollId: String): Result<Poll> =
        withContext(Dispatchers.IO) {
            try {
                val result = votePollApi.getPoll(pollId)
                result.predictionPollsError?.message?.let {
                    return@withContext Result.Error(Exception(it))
                }
                return@withContext Result.Success(result.toPollDomainModel())
            } catch (e: Exception) {
                return@withContext Result.Error(e)
            }
        }

    override suspend fun voteForDiscretePoll(
        pollId: String,
        points: Int,
        voteId: String
    ): Result<Unit> =
        withContext(Dispatchers.IO) {
            try {
                val result = votePollApi.voteForDiscretePoll(
                    pollId,
                    DiscreteVotePollRequest(
                        voteId,
                        points.toString()
                    )
                )
                if (result.error != null) {
                    return@withContext Result.Error(Exception(result.error))
                }
                return@withContext Result.Success(Unit)
            } catch (e: Exception) {
                return@withContext Result.Error(e)
            }
        }

    override suspend fun voteForContinuousPoll(
        pollId: String,
        points: Int,
        voteInput: String
    ): Result<Unit> =
        withContext(Dispatchers.IO) {
            try {
                val result = votePollApi.voteForContinuousPoll(
                    pollId,
                    ContinuousPollRequest(
                        points.toString(),
                        voteInput
                    )
                )
                if (result.error != null) {
                    return@withContext Result.Error(Exception(result.error))
                }
                return@withContext Result.Success(Unit)
            } catch (e: Exception) {
                return@withContext Result.Error(e)
            }
        }
}