package com.bounswe.predictionpolls.ui.moderation.apply

sealed class ModerationApplyScreenEvent {
    data object ApplyToModeration : ModerationApplyScreenEvent()
    data object CheckCurrentStatus : ModerationApplyScreenEvent()
}