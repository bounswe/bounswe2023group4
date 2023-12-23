package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.data.remote.model.request.RequestPasswordResetRequest
import com.bounswe.predictionpolls.data.remote.services.AuthService
import javax.inject.Inject

class RequestPasswordResetRepository @Inject constructor(private val api: AuthService) {
    suspend fun requestPasswordReset(email: String) {
        val request = RequestPasswordResetRequest(email)
        api.requestPasswordReset(request)
    }
}