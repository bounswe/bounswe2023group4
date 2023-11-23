package com.bounswe.predictionpolls.ui.create

sealed class CreatePollScreenEvent {
    data class OnQuestionChanged(val question: String): CreatePollScreenEvent()
    data class OnPollTypeChanged(val pollType: CreatePollScreenState.PollType): CreatePollScreenEvent()
    data class OnDiscreteOptionChanged(val option: String, val position: Int): CreatePollScreenEvent()
    data object OnDiscreteOptionAdded: CreatePollScreenEvent()
    data class OnDiscreteOptionRemoved(val position: Int): CreatePollScreenEvent()
    data class OnContinuousInputTypeChanged(val inputType: CreatePollScreenState.ContinuousInputType): CreatePollScreenEvent()
    data class OnDueDateChecked(val isChecked: Boolean): CreatePollScreenEvent()
    data class OnDueDateChanged(val dueDate: String): CreatePollScreenEvent()
    data class OnLastAcceptValueChanged(val value: String): CreatePollScreenEvent()
    data class OnAcceptValueTypeChanged(val type: CreatePollScreenState.AcceptValueType): CreatePollScreenEvent()
    data class OnDistributionVisibilityChanged(val isChecked: Boolean): CreatePollScreenEvent()
    data object OnCreatePollClicked: CreatePollScreenEvent()
}