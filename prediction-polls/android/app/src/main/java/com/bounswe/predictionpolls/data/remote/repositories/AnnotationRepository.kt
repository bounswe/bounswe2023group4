package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.core.BaseRepository
import com.bounswe.predictionpolls.data.remote.model.request.CreateAnnotationRequest
import com.bounswe.predictionpolls.data.remote.services.AnnotationService
import com.bounswe.predictionpolls.domain.annotation.PollAnnotation
import javax.inject.Inject

class AnnotationRepository @Inject constructor(
    private val annotationService: AnnotationService
): AnnotationRepositoryInterface, BaseRepository() {
    override suspend fun getAnnotations(
        source: String,
    ): List<PollAnnotation> {
        return execute {
            annotationService.getAnnotations(
                source = source,
            ).annotations.map { it.toAnnotation() }
        }
    }

    override suspend fun getAnnotation(id: String): PollAnnotation? {
        return execute {
            annotationService.getAnnotation(id).annotations.map { it.toAnnotation() }.firstOrNull()
        }
    }

    override suspend fun createAnnotation(
        source: String,
        prefix: String,
        exact: String,
        suffix: String,
        value: String,
        creator: String,
    ) {
        val createAnnotationRequest = CreateAnnotationRequest(
            context = "http://www.w3.org/ns/anno.jsonld",
            type = "Annotation",
            creator = creator,
            target = CreateAnnotationRequest.Target(
                source = source,
                selector = CreateAnnotationRequest.Selector(
                    type = "TextQuoteSelector",
                    exact = exact,
                    prefix = prefix,
                    suffix = suffix
                )
            ),
            body = CreateAnnotationRequest.Body(
                type = "TextualBody",
                value = value,
                format = "text/plain"
            )
        )

        return execute {
            annotationService.createAnnotation(createAnnotationRequest)
        }
    }

    override suspend fun deleteAnnotation(id: String) {
        return execute {
            annotationService.deleteAnnotation(id)
        }
    }
}