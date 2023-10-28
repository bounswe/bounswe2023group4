package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.response.LoginResponse
import retrofit2.Response
import retrofit2.http.POST

interface AuthService {
    @POST("/signup")
    suspend fun signup(): Response<Void>

    @POST("/login")
    suspend fun login(): Response<LoginResponse>

    @POST("/logout")
    suspend fun logout(): Response<Void>
}