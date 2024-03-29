package com.bounswe.predictionpolls.ui.create

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.PollRepositoryInterface
import com.bounswe.predictionpolls.data.remote.repositories.SemanticSearchRepository
import com.bounswe.predictionpolls.extensions.toISO8601
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class CreatePollViewModel @Inject constructor(
    private val pollRepository: PollRepositoryInterface,
    private val semanticSearchRepository: SemanticSearchRepository
) : BaseViewModel() {
    var screenState by mutableStateOf(CreatePollScreenState())
        private set

    fun onEvent(event: CreatePollScreenEvent) {
        screenState = screenState.reduce(event)
        when (event) {
            is CreatePollScreenEvent.OnCreatePollClicked -> {
                onCreatePoll(event.onSuccess)
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

    fun onTagSearchTextChanged(text: String) {
        screenState = screenState.copy(
            searchedTag = text
        )
        fetchTags()
    }

    fun clearCreatedPollId() {
        screenState = screenState.copy(
            createdPollId = -1
        )
    }

    fun onTagInserted(pollId: Int, tag: String) {
        launchCatching {
            semanticSearchRepository.insertTag(pollId, tag)
        }
    }

    private fun fetchTags() {
        launchCatching(
            onSuccess = {
                screenState = screenState.copy(
                    tags = it
                )
            }
        ) {
            semanticSearchRepository.getTags(screenState.searchedTag)
        }
    }

    private fun onCreatePoll(onSuccess: () -> Unit) {
        if (isInputValid().not()) return

        val formattedDueDate = if (screenState.isDueDateEnabled) {
            screenState.dueDate.toISO8601()
        } else {
            null
        }

        launchCatching(
            trackJobProgress = true,
            maxRetryCount = 1,
            onSuccess = {
                onSuccess()
                screenState = screenState.copy(
                    createdPollId = it
                )
                fetchTags()
            }
        ) {
            when (screenState.pollType) {
                CreatePollScreenState.PollType.DISCRETE -> {
                    pollRepository.createDiscretePoll(
                        screenState.question,
                        screenState.discreteOptions,
                        screenState.isDistributionVisible,
                        screenState.isDueDateEnabled,
                        formattedDueDate,
                        screenState.lastAcceptValue.filter { it.isDigit() }
                            .takeIf { it.isBlank().not() }?.toInt(),
                        screenState.acceptValueType.toDiscreteRequestType().value,
                    )
                }

                CreatePollScreenState.PollType.CONTINUOUS -> {
                    pollRepository.createContinuousPoll(
                        screenState.question,
                        screenState.isDistributionVisible,
                        screenState.isDueDateEnabled,
                        formattedDueDate,
                        screenState.lastAcceptValue.filter { it.isDigit() }
                            .takeIf { it.isBlank().not() }?.toInt(),
                        screenState.acceptValueType.toContinuousRequestType().value,
                        screenState.continuousInputType.toContinuousRequestType().value,
                    )
                }
            }
        }
    }
}