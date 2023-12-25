package com.bounswe.predictionpolls.data.remote.interceptors

import okhttp3.Interceptor
import okhttp3.Response

class JsonLdInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        val modifiedRequest = originalRequest.newBuilder()
            .header("Content-Type", "application/ld+json")
            .build()
        return chain.proceed(modifiedRequest)
    }
}
