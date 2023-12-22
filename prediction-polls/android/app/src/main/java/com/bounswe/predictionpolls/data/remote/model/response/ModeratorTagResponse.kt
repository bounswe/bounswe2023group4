package com.bounswe.predictionpolls.data.remote.model.response

import com.bounswe.predictionpolls.domain.moderation.ModeratorTag

data class ModeratorTagResponse(
    val topic: String,
    val isSelected: Boolean
){
    fun toModeratorTag(): ModeratorTag {
        return ModeratorTag(
            topic = this.topic,
            isSelected = this.isSelected
        )
    }
}
