package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.model.request.CreateContinuousPollRequest
import com.bounswe.predictionpolls.data.remote.model.request.CreateDiscretePollRequest
import com.bounswe.predictionpolls.data.vote.ContinuousPollRequest
import com.bounswe.predictionpolls.data.vote.DiscreteVotePollRequest
import com.bounswe.predictionpolls.data.vote.VotePollResponse
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Path

interface PollService {
    @POST("/polls/discrete")
    suspend fun createDiscretePoll(
        @Body createDiscretePollRequest: CreateDiscretePollRequest
    )

    @POST("/polls/continuous")
    suspend fun createContinuousPoll(
        @Body createContinuousPollRequest: CreateContinuousPollRequest
    )

    @POST("/polls/discrete/{pollId}/vote")
    suspend fun voteForDiscretePoll(
        @Path("pollId") pollId: String,
        @Body discretePollRequest: DiscreteVotePollRequest
    ): VotePollResponse

    @POST("/polls/continuous/{pollId}/vote")
    suspend fun voteForContinuousPoll(
        @Path("pollId") pollId: String,
        @Body continuousPollRequest: ContinuousPollRequest
    ): VotePollResponse

}