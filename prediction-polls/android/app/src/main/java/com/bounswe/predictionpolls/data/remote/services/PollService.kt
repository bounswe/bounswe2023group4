package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.model.request.CreateContinuousPollRequest
import com.bounswe.predictionpolls.data.remote.model.request.CreateDiscretePollRequest
import retrofit2.http.Body
import retrofit2.http.POST

interface PollService {
    @POST("/polls/discrete")
    suspend fun createDiscretePoll(
        @Body createDiscretePollRequest: CreateDiscretePollRequest
    )

    @POST("/polls/continuous")
    suspend fun createContinuousPoll(
        @Body createContinuousPollRequest: CreateContinuousPollRequest
    )
}