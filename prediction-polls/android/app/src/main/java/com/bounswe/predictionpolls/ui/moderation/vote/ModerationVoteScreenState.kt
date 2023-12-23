package com.bounswe.predictionpolls.ui.moderation.vote

import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll

data class ModerationVoteScreenState(
    val request: ModeratorPoll? = null,
    val isEventHappened: Boolean = false,
    val selectedOptionId: Int? = null,
    val givenOption: String? = null,
    val isAgreedTerms: Boolean = false,
    val errorMessage: String? = null
)
