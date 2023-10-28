package com.bounswe.predictionpolls.data.remote.interceptors

import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.repositories.TokenRefresherRepository
import javax.inject.Inject
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response

class AuthInterceptor @Inject constructor(
    private val tokenManager: TokenManager,
    private val tokenRefresherRepository: TokenRefresherRepository
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        var request = chain.request()

        tokenManager.accessToken?.let { token ->
            request = addAuthHeader(request, token)
        }

        var response = chain.proceed(request)
        if (response.code == 401) {
            refreshAccessToken()?.let { newAccessToken ->
                tokenManager.accessToken = newAccessToken
                request = addAuthHeader(request, newAccessToken)
                response = chain.proceed(request)
            }
        }

        return response
    }

    private fun addAuthHeader(request: Request, token: String): Request {
        return request.newBuilder()
            .header("Authorization", "Bearer $token")
            .build()
    }

    private fun refreshAccessToken(): String? {
        val newAccessToken: String?
        runBlocking {
            newAccessToken = tokenRefresherRepository.refreshAccessToken()
        }
        return newAccessToken
    }
}