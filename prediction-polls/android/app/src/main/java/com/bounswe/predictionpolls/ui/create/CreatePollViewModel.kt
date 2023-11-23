package com.bounswe.predictionpolls.ui.create

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.PollRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class CreatePollViewModel @Inject constructor(
    private val pollRepository: PollRepository
) : BaseViewModel() {
    var screenState by mutableStateOf(CreatePollScreenState())
        private set

    fun onEvent(event: CreatePollScreenEvent) {
        screenState = screenState.reduce(event)
        when (event) {
            is CreatePollScreenEvent.OnCreatePollClicked -> {
                onCreatePoll()
            }

            is CreatePollScreenEvent.OnErrorDismissed -> {
                error = null
            }

            else -> {}
        }
    }

    private fun isInputValid(): Boolean {
        if (screenState.isQuestionValid.not()) {
            screenState =
                screenState.copy(inputValidationError = R.string.poll_create_screen_question_error)
            return false
        } else if (screenState.isDiscreteOptionsValid.not()) {
            screenState =
                screenState.copy(inputValidationError = R.string.poll_create_screen_options_error)
            return false
        } else if (screenState.isDueDateValid.not()) {
            screenState =
                screenState.copy(inputValidationError = R.string.poll_create_due_date_error)
            return false
        }
        return true
    }

    private fun onCreatePoll() {
        if (isInputValid().not()) return

        val formattedDueDate = if (screenState.isDueDateEnabled) {
            screenState.dueDate.run {
                "${substring(4, 8)}/${substring(2, 4)}/${substring(0, 2)}"
            }
        } else {
            null
        }

        launchCatching(
            trackJobProgress = true,
            maxRetryCount = 1
        ) {
            when (screenState.pollType) {
                CreatePollScreenState.PollType.DISCRETE -> {
                    pollRepository.createDiscretePoll(
                        screenState.question,
                        screenState.discreteOptions,
                        screenState.isDistributionVisible,
                        screenState.isDueDateEnabled,
                        formattedDueDate,
                        screenState.lastAcceptValue.filter { it.isDigit() }.toInt(),
                        screenState.acceptValueType.toDiscreteRequestType().value,
                    )
                }

                CreatePollScreenState.PollType.CONTINUOUS -> {
                    pollRepository.createContinuousPoll(
                        screenState.question,
                        screenState.isDistributionVisible,
                        screenState.isDueDateEnabled,
                        formattedDueDate,
                        screenState.lastAcceptValue.filter { it.isDigit() }.toInt(),
                        screenState.acceptValueType.toContinuousRequestType().value,
                        screenState.continuousInputType.toContinuousRequestType().value,
                    )
                }
            }
        }
    }
}