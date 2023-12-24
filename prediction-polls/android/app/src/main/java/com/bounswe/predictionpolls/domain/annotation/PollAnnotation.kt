package com.bounswe.predictionpolls.domain.annotation

data class PollAnnotation(
    val id: String,
    val target: Target,
    val body: Body,
    val creator: String,
) {
    data class Target(
        val selector: Selector,
        val source: String
    )

    data class Selector(
        val exact: String,
        val prefix: String,
        val suffix: String,
    )

    data class Body(
        val value: String
    )
}
