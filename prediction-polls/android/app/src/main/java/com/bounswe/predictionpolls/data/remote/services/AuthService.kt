package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.model.request.LoginRequest
import com.bounswe.predictionpolls.data.remote.model.request.LogoutRequest
import com.bounswe.predictionpolls.data.remote.model.request.RefreshAccessTokenRequest
import com.bounswe.predictionpolls.data.remote.model.request.SignInWithGoogleRequest
import com.bounswe.predictionpolls.data.remote.model.request.SignupRequest
import com.bounswe.predictionpolls.data.remote.model.response.LoginResponse
import com.bounswe.predictionpolls.data.remote.model.response.RefreshAccessTokenResponse
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("/auth/signup")
    suspend fun signup(
        @Body signupRequest: SignupRequest
    )

    @POST("/auth/login")
    suspend fun login(
        @Body loginRequest: LoginRequest
    ): LoginResponse

    @POST("/auth/logout")
    suspend fun logout(
        @Body logoutRequest: LogoutRequest
    )

    @POST("/auth/access-token")
    suspend fun refreshAccessToken(
        @Body refreshAccessTokenRequest: RefreshAccessTokenRequest
    ): RefreshAccessTokenResponse

    @POST("/auth/google")
    suspend fun loginWithGoogle(
        @Body loginWithGoogleRequest: SignInWithGoogleRequest
    ): LoginResponse
}