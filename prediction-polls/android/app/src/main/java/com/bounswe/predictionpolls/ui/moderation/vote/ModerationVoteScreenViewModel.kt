package com.bounswe.predictionpolls.ui.moderation.vote

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.SavedStateHandle
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll
import com.bounswe.predictionpolls.domain.moderation.ModeratorUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class ModerationVoteScreenViewModel @Inject constructor(
    private val moderatorUseCase: ModeratorUseCase,
    savedStateHandle: SavedStateHandle
) : BaseViewModel() {
    private val requestId: Int = savedStateHandle.get<Int>("requestId")!!

    var screenState by mutableStateOf(ModerationVoteScreenState())
        private set

    init {
        fetchPoll()
    }

    fun onEvent(event: ModerationVoteScreenEvent) {
        when (event) {
            is ModerationVoteScreenEvent.OnResolveClicked -> {
                resolvePoll(
                    onSuccess = event.onSuccess
                )
            }
            is ModerationVoteScreenEvent.OnAgreeTermsClicked -> {
                screenState = screenState.copy(
                    isAgreedTerms = event.isChecked
                )
            }
            is ModerationVoteScreenEvent.OnOptionSelected -> {
                if (event.optionId == screenState.selectedOptionId) {
                    screenState = screenState.copy(
                        selectedOptionId = null
                    )
                } else {
                    screenState = screenState.copy(
                        selectedOptionId = event.optionId
                    )
                }
            }
            is ModerationVoteScreenEvent.OnOptionTextChanged -> {
                screenState = screenState.copy(
                    givenOption = event.option
                )
            }
            is ModerationVoteScreenEvent.OnEventHappenedClicked -> {
                screenState = screenState.copy(
                    isEventHappened = event.isChecked
                )
            }
            is ModerationVoteScreenEvent.DismissError -> {
                screenState = screenState.copy(
                    errorMessage = null
                )
            }
        }
    }

    private fun validateForm(): Boolean {
        if (screenState.isEventHappened.not()) {
            screenState = screenState.copy(
                errorMessage = "You cannot resolve a poll that is not happened yet."
            )
            return false
        }

        if (screenState.givenOption.isNullOrBlank() &&
            screenState.request?.requestType == ModeratorPoll.RequestType.CONTINUOUS
        ) {
            screenState = screenState.copy(
                errorMessage = "You must enter an option"
            )
            return false
        }

        if (screenState.selectedOptionId == null &&
            screenState.request?.requestType == ModeratorPoll.RequestType.DISCRETE
        ) {
            screenState = screenState.copy(
                errorMessage = "You must select an option"
            )
            return false
        }

        if (screenState.isAgreedTerms.not()) {
            screenState = screenState.copy(
                errorMessage = "You must agree to terms and conditions"
            )
            return false
        }

        return true
    }

    private fun resolvePoll(
        onSuccess: () -> Unit,
    ) {
        val isFormValid = validateForm()
        if (isFormValid.not()) return

        launchCatching(
            onSuccess = {
                onSuccess()
            }
        ) {
            val option: Any? = if (
                screenState.request?.requestType == ModeratorPoll.RequestType.DISCRETE
            ) {
                screenState.request?.poll?.options?.find { it.id == screenState.selectedOptionId }?.id
            } else {
                screenState.givenOption
            }

            option?.let {
                moderatorUseCase.concludeRequest(
                    moderatorPoll = screenState.request!!,
                    choice = option
                )
            }
        }
    }

    private fun fetchPoll() {
        launchCatching(
            onSuccess = {
                screenState = screenState.copy(
                    request = it.find { it.requestId == requestId }
                )
            }
        ) {
            moderatorUseCase.getModeratorRequests()
        }
    }
}