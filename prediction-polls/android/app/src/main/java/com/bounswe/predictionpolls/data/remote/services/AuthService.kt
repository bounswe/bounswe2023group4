package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.request.LoginRequest
import com.bounswe.predictionpolls.data.remote.request.LogoutRequest
import com.bounswe.predictionpolls.data.remote.request.RefreshAccessTokenRequest
import com.bounswe.predictionpolls.data.remote.request.SignupRequest
import com.bounswe.predictionpolls.data.remote.response.LoginResponse
import com.bounswe.predictionpolls.data.remote.response.RefreshAccessTokenResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("/signup")
    suspend fun signup(
        @Body signupRequest: SignupRequest
    ): Response<Void>

    @POST("/login")
    suspend fun login(
        @Body loginRequest: LoginRequest
    ): Response<LoginResponse>

    @POST("/logout")
    suspend fun logout(
        @Body logoutRequest: LogoutRequest
    ): Response<Void>

    @POST("/access-token")
    suspend fun refreshAccessToken(
        @Body refreshAccessTokenRequest: RefreshAccessTokenRequest
    ): Response<RefreshAccessTokenResponse>
}