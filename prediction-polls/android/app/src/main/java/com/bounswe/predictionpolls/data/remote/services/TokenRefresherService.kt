package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.response.RefreshAccessTokenResponse
import retrofit2.Response
import retrofit2.http.POST

interface TokenRefresherService {
    @POST("/access-token")
    suspend fun refreshAccessToken(): Response<RefreshAccessTokenResponse>
}