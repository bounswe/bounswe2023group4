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
        email: String,
        username: String,
        password: String,
        birthday: String
    ) {
        authService.signup(SignupRequest(email, username, password, birthday))
        login(username, password)
    }

    suspend fun logout() {
        tokenManager.refreshToken?.let { token ->
            authService.logout(LogoutRequest(token))
            tokenManager.accessToken = null
            tokenManager.refreshToken = null
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