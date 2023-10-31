package com.bounswe.predictionpolls.core

import java.io.IOException
import retrofit2.HttpException

abstract class BaseRepository {
    suspend fun <T> execute(request: suspend () -> T): T {
        return try {
            request.invoke()
        } catch (exception: Exception) {
            throw handleException(exception)
        }
    }

    //TODO handle exceptions
    private fun handleException(exception: Exception): Exception {
        return when (exception) {
            is HttpException -> {
                exception.response()?.errorBody()?.string()?.let {
                    return IOException(it)
                }.run {
                    IOException("Unexpected error occurred. Please try again.")
                }
            }

            else -> {
                IOException("Unexpected error occurred. Please try again.")
            }
        }
    }
}