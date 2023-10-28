package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.services.AuthService
import javax.inject.Inject

class AuthRepository @Inject constructor(
    private val authService: AuthService,
    private val tokenManager: TokenManager
) {
    suspend fun login() {
        authService.login().body()?.let {
            tokenManager.accessToken = it.accessToken
            tokenManager.refreshToken = it.refreshToken
        }
    }

    suspend fun signup() {
        if (authService.signup().code() == 200){
            login()
        }
    }

    suspend fun logout() {
        val response = authService.logout()
        if (response.code() == 200){
            tokenManager.accessToken = null
            tokenManager.refreshToken = null
        }
    }
}