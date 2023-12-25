package com.bounswe.predictionpolls.data.remote.model.response

import com.bounswe.predictionpolls.domain.semantic.SemanticTag

data class SemanticSearchTagResponse(
    val id: String,
    val label: String,
    val description: String,
) {
    fun toSemanticTag(): SemanticTag {
        return SemanticTag(
            id = this.id,
            label = this.label,
            description = this.description,
        )
    }
}