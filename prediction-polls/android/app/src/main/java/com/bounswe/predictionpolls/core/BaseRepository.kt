package com.bounswe.predictionpolls.core

import java.io.IOException

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
        return IOException("Unexpected error occurred. Please try again.")
    }
}