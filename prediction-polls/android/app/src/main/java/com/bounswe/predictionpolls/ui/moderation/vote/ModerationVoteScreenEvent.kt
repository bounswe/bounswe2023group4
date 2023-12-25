package com.bounswe.predictionpolls.ui.moderation.vote

sealed class ModerationVoteScreenEvent {
    data class OnOptionSelected(val optionId: Int) : ModerationVoteScreenEvent()
    data class OnResolveClicked(
        val onSuccess: () -> Unit,
    ) : ModerationVoteScreenEvent()
    data class OnAgreeTermsClicked(val isChecked: Boolean) : ModerationVoteScreenEvent()
    data class OnEventHappenedClicked(val isChecked: Boolean) : ModerationVoteScreenEvent()

    data class OnOptionTextChanged(val option: String) : ModerationVoteScreenEvent()

    data object DismissError : ModerationVoteScreenEvent()
}
