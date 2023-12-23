package com.bounswe.predictionpolls.ui.moderation.list

import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll
import com.bounswe.predictionpolls.domain.moderation.ModeratorTag

data class ModerationScreenState(
    val tags: List<ModeratorTag> = emptyList(),
    val requestedPolls: List<ModeratorPoll> = emptyList(),
) {
    fun reduce(event: ModerationScreenEvent): ModerationScreenState {
        return when (event) {
            else -> this
        }
    }
}
