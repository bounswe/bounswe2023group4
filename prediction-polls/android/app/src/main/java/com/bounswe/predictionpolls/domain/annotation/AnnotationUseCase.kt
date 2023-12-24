package com.bounswe.predictionpolls.domain.annotation

import android.content.Context
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.data.remote.repositories.AnnotationRepositoryInterface
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject

class AnnotationUseCase @Inject constructor(
    @ApplicationContext private val context: Context,
    private val annotationRepository: AnnotationRepositoryInterface
) {
    suspend fun getAnnotations(
        page: PollAnnotationPages,
    ): List<PollAnnotation> {
        return annotationRepository.getAnnotations(
            source = page.toSource(context.getString(R.string.front_end_url)),
        )
    }

    suspend fun getAnnotation(
        id: String,
    ): PollAnnotation? {
        return annotationRepository.getAnnotation(
            id = id
        )
    }

    suspend fun createAnnotation(
        page: PollAnnotationPages,
        prefix: String,
        exact: String,
        suffix: String,
        value: String,
        username: String,
    ) {
        val frontEndUrl = context.getString(R.string.front_end_url)
        val creator = "$frontEndUrl/profile/$username"

        return annotationRepository.createAnnotation(
            creator = creator,
            prefix = prefix,
            exact = exact,
            suffix = suffix,
            value = value,
            source = page.toSource(frontEndUrl),
        )
    }

    suspend fun deleteAnnotation(
        id: String,
    ) {
        return annotationRepository.deleteAnnotation(
            id = id
        )
    }
}