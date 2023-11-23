package com.bounswe.predictionpolls.ui.create

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.PollRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class CreatePollViewModel @Inject constructor(
    private val pollRepository: PollRepository
): BaseViewModel() {
    var screenState by mutableStateOf(CreatePollScreenState())
        private set

    fun onEvent(event: CreatePollScreenEvent) {
        screenState = screenState.reduce(event)
        when (event) {
            is CreatePollScreenEvent.OnCreatePollClicked -> {
                onCreatePoll()
            }
            else -> {}
        }
    }

    private fun onCreatePoll() {
        launchCatching(
            trackJobProgress = true
        ) {
            when(screenState.pollType){
                CreatePollScreenState.PollType.DISCRETE -> {
                    pollRepository.createDiscretePoll(
                        screenState.question,
                        screenState.discreteOptions,
                        screenState.isDistributionVisible,
                        screenState.isDueDateEnabled,
                        screenState.dueDate,
                        screenState.lastAcceptValue.filter { it.isDigit() }.toInt(),
                        screenState.acceptValueType.toDiscreteRequestType(),
                    )
                }
                CreatePollScreenState.PollType.CONTINUOUS -> {
                    pollRepository.createContinuousPoll(
                        screenState.question,
                        screenState.isDistributionVisible,
                        screenState.isDueDateEnabled,
                        screenState.dueDate,
                        screenState.lastAcceptValue.filter { it.isDigit() }.toInt(),
                        screenState.acceptValueType.toContinuousRequestType(),
                        screenState.continuousInputType.toContinuousRequestType(),
                    )
                }
            }
        }
    }
}