package com.bounswe.predictionpolls.data.remote.interceptors

import okhttp3.Interceptor
import okhttp3.Response

// If the response code is 204, we need to change it to 200
// because retrofit throws an exception when the response code is 204
class ResponseInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        val response: Response = chain.proceed(request)
        return if (response.code == 204) response.newBuilder().code(200).build()
        else response
    }
}