package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.core.BaseRepository
import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.model.request.LoginRequest
import com.bounswe.predictionpolls.data.remote.model.request.LogoutRequest
import com.bounswe.predictionpolls.data.remote.model.request.RefreshAccessTokenRequest
import com.bounswe.predictionpolls.data.remote.model.request.SignInWithGoogleRequest
import com.bounswe.predictionpolls.data.remote.model.request.SignupRequest
import com.bounswe.predictionpolls.data.remote.services.AuthService
import javax.inject.Inject

class AuthRepository @Inject constructor(
    private val authService: AuthService,
    private val tokenManager: TokenManager
) : BaseRepository() {
    suspend fun login(
        username: String,
        password: String
    ) {
        val loginRequest = LoginRequest(username, password)
        execute {
            authService.login(loginRequest).let {
                tokenManager.accessToken = it.accessToken
                tokenManager.refreshToken = it.refreshToken
            }
        }
    }

    suspend fun signup(
        email: String,
        username: String,
        password: String,
        birthday: String
    ) {
        execute {
            authService.signup(SignupRequest(email, username, password, birthday))
            login(username, password)
        }
    }

    suspend fun logout() {
        execute {
            tokenManager.refreshToken?.let { token ->
                authService.logout(LogoutRequest(token))
                tokenManager.accessToken = null
                tokenManager.refreshToken = null
            }
        }
    }

    suspend fun refreshAccessToken(): String? {
        val refreshToken = tokenManager.refreshToken ?: return null
        val refreshAccessTokenRequest = RefreshAccessTokenRequest(refreshToken)
        var newToken: String? = null
        execute {
            authService.refreshAccessToken(refreshAccessTokenRequest).accessToken.let {
                newToken = it
                tokenManager.accessToken = it
            }
        }
        return newToken
    }

    suspend fun loginWithGoogle(
        idToken: String
    ) {
        val loginWithGoogleRequest = SignInWithGoogleRequest(idToken)
        execute {
            authService.loginWithGoogle(loginWithGoogleRequest).let {
                tokenManager.accessToken = it.accessToken
                tokenManager.refreshToken = it.refreshToken
            }
        }
    }
}