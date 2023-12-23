package com.bounswe.predictionpolls.ui.moderation.list

import com.bounswe.predictionpolls.domain.moderation.ModeratorTag

sealed class ModerationScreenEvent {
    data class OnTagSelected(val tag: ModeratorTag) : ModerationScreenEvent()
    data class OnTagRemoved(val tag: ModeratorTag) : ModerationScreenEvent()
}
