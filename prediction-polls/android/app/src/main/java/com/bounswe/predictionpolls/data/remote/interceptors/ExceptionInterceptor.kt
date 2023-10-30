package com.bounswe.predictionpolls.data.remote.interceptors

import java.io.IOException
import okhttp3.Interceptor
import okhttp3.Response

class ExceptionInterceptor : Interceptor {
    @Throws(IOException::class)
    override fun intercept(chain: Interceptor.Chain): Response {
        val response = chain.proceed(chain.request())

        // TODO: handle error codes better
        if (!response.isSuccessful) {
            throw IOException("Unexpected code $response")
        }

        return response
    }
}
