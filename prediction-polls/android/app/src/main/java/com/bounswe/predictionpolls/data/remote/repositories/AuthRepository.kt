package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.request.LoginRequest
import com.bounswe.predictionpolls.data.remote.request.LogoutRequest
import com.bounswe.predictionpolls.data.remote.request.RefreshAccessTokenRequest
import com.bounswe.predictionpolls.data.remote.request.SignupRequest
import com.bounswe.predictionpolls.data.remote.services.AuthService
import javax.inject.Inject

class AuthRepository @Inject constructor(
    private val authService: AuthService,
    private val tokenManager: TokenManager
) {
    suspend fun login(
        username: String,
        password: String
    ) {
        val loginRequest = LoginRequest(username, password)
        authService.login(loginRequest).body()?.let {
            tokenManager.accessToken = it.accessToken
            tokenManager.refreshToken = it.refreshToken
        }
    }

    suspend fun signup(
        username: String,
        password: String
    ) {
        val signupRequest = SignupRequest(username, password)
        if (authService.signup(signupRequest).code() == 200) {
            login(
                username = username,
                password = password
            )
        }
    }

    suspend fun logout() {
        tokenManager.refreshToken?.let { token ->
            val logoutRequest = LogoutRequest(token)
            val response = authService.logout(logoutRequest)
            if (response.code() == 200) {
                tokenManager.accessToken = null
                tokenManager.refreshToken = null
            }
        }
    }

    suspend fun refreshAccessToken(): String? {
        val refreshToken = tokenManager.refreshToken ?: return null
        val refreshAccessTokenRequest = RefreshAccessTokenRequest(refreshToken)
        val newToken = authService.refreshAccessToken(refreshAccessTokenRequest).body()?.accessToken
        tokenManager.accessToken = newToken
        return newToken
    }
}