package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.domain.annotation.PollAnnotation

interface AnnotationRepositoryInterface {
    suspend fun getAnnotations(
        source: String,
    ): List<PollAnnotation>
    suspend fun getAnnotation(
        id: String
    ): PollAnnotation?

    suspend fun createAnnotation(
        source: String,
        prefix: String,
        exact: String,
        suffix: String,
        value: String,
        creator: String,
    )

    suspend fun deleteAnnotation(id: String)
}