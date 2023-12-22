package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.model.request.ModeratorAppointRequest
import com.bounswe.predictionpolls.data.remote.model.request.ModeratorRequest
import com.bounswe.predictionpolls.data.remote.model.request.ModeratorTagRequest
import com.bounswe.predictionpolls.data.remote.model.response.ModeratorRequestResponse
import com.bounswe.predictionpolls.data.remote.model.response.ModeratorTagResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ModerationService {
    @POST("/moderators/appoint")
    suspend fun appointModerator(
        @Body moderatorAppointRequest: ModeratorAppointRequest
    )

    @POST("/moderators/request-promotion")
    suspend fun requestPromotion()

    @GET("/moderators/my-tags")
    suspend fun getMyTags(): List<ModeratorTagResponse>

    @POST("/moderators/my-tags")
    suspend fun updateMyTag(
        @Body myTag: ModeratorTagRequest
    )

    @GET("/moderators/my-requests")
    suspend fun getRequests(): List<ModeratorRequestResponse>

    @POST("/moderators/my-requests")
    suspend fun concludeRequest(
        @Body request: ModeratorRequest
    )
}