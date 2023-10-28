package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.services.TokenRefresherService
import javax.inject.Inject

class TokenRefresherRepository @Inject constructor(
    private val tokenRefresherService: TokenRefresherService,
    private val tokenManager: TokenManager
) {
    suspend fun refreshAccessToken(): String? {
        val newToken = tokenRefresherService.refreshAccessToken().body()?.accessToken
        tokenManager.accessToken = newToken
        return newToken
    }
}