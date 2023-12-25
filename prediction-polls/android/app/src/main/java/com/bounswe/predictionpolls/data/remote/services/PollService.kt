package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.feed.model.PollResponse
import com.bounswe.predictionpolls.data.remote.model.request.CreateContinuousPollRequest
import com.bounswe.predictionpolls.data.remote.model.request.CreateDiscretePollRequest
import com.bounswe.predictionpolls.data.remote.model.request.PollCommentRequest
import com.bounswe.predictionpolls.data.remote.model.response.CreatePollResponse
import com.bounswe.predictionpolls.data.remote.model.response.GetCommentResponse
import com.bounswe.predictionpolls.data.vote.ContinuousPollRequest
import com.bounswe.predictionpolls.data.vote.DiscreteVotePollRequest
import com.bounswe.predictionpolls.data.vote.VotePollResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface PollService {
    @POST("/polls/discrete")
    suspend fun createDiscretePoll(
        @Body createDiscretePollRequest: CreateDiscretePollRequest
    ): CreatePollResponse

    @POST("/polls/continuous")
    suspend fun createContinuousPoll(
        @Body createContinuousPollRequest: CreateContinuousPollRequest
    ): CreatePollResponse

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

    @GET("/polls/{pollId}")
    suspend fun getPoll(
        @Path("pollId") pollId: String
    ): PollResponse

    @POST("/polls/report/{pollId}")
    suspend fun reportPoll(
        @Path("pollId") pollId: String
    )

    @POST("/polls/{pollId}/comment")
    suspend fun commentPoll(
        @Path("pollId") pollId: Int,
        @Body request: PollCommentRequest
    )

    @GET("/polls/{pollId}/comments")
    suspend fun getPollComments(
        @Path("pollId") pollId: Int
    ): List<GetCommentResponse>

    @GET("/polls/opened")
    suspend fun getOpenedPolls(
        @Query("username") username: String
    ): List<PollResponse>

    @GET("/polls/opened/me")
    suspend fun getOpenedPollsForMe(): List<PollResponse>
}