package com.bounswe.predictionpolls.data.remote.model.response

import com.bounswe.predictionpolls.domain.annotation.PollAnnotation

data class GetAnnotationsResponse(
    val annotations: List<AnnotationResponse>
) {
    data class AnnotationResponse(
        val body: Body,
        val created: String,
        val creator: String,
        val id: String,
        val modified: String,
        val target: Target,
        val type: String
    ){
        fun toAnnotation(): PollAnnotation {
            return PollAnnotation(
                id = id,
                creator = creator,
                target = target.toTarget(),
                body = body.toBody()
            )
        }
    }

    data class Target(
        val selector: Selector,
        val source: String
    ) {
        fun toTarget(): PollAnnotation.Target {
            return PollAnnotation.Target(
                source = source,
                selector = selector.toSelector()
            )
        }
    }

    data class Selector(
        val type: String,
        val exact: String,
        val prefix: String,
        val suffix: String,
    ) {
        fun toSelector(): PollAnnotation.Selector {
            return PollAnnotation.Selector(
                exact = exact,
                prefix = prefix,
                suffix = suffix
            )
        }
    }

    data class Body(
        val format: String,
        val type: String,
        val value: String
    ) {
        fun toBody(): PollAnnotation.Body {
            return PollAnnotation.Body(
                value = value
            )
        }
    }
}
