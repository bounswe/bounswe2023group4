package com.bounswe.predictionpolls.ui.vote

import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.PollRepositoryInterface
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.poll.VotePollRepository
import com.bounswe.predictionpolls.domain.poll.VotePollUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch


@HiltViewModel
class PollVoteViewModel @Inject constructor(
    private val votePollUseCase: VotePollUseCase,
    private val votePollRepository: VotePollRepository,
    private val pollRepository: PollRepositoryInterface
) : BaseViewModel() {

    private val _state = MutableStateFlow<PollVoteScreenUiState>(PollVoteScreenUiState.Loading)

    val state: StateFlow<PollVoteScreenUiState>
        get() = _state.asStateFlow()


    fun fetchPoll(pollId: String) = viewModelScope.launch {
        when (val result = votePollRepository.fetchPoll(pollId)) {
            is Result.Success -> {
                when (val poll = result.data) {
                    is Poll.DiscretePoll -> {
                        _state.update { PollVoteScreenUiState.DiscretePoll(poll, "", 0, null) }
                    }

                    is Poll.ContinuousPoll -> {
                        _state.update { PollVoteScreenUiState.ContinuousPoll(poll, "", 0, null) }
                    }
                }
                fetchPollComments(pollId.toInt())
            }

            is Result.Error -> {
                _state.update {
                    PollVoteScreenUiState.Error(
                        result.exception.message ?: "Unknown error"
                    )
                }
            }
        }
    }

    private fun fetchPollComments(pollId: Int) = viewModelScope.launch {
        launchCatching(
            onSuccess = {
                _state.update { currentState ->
                    when (currentState) {
                        is PollVoteScreenUiState.DiscretePoll -> currentState.copy(comments = it)
                        is PollVoteScreenUiState.ContinuousPoll -> currentState.copy(comments = it)
                        else -> currentState
                    }
                }
            }
        ) {
            pollRepository.getComments(pollId)
        }
    }

    fun postComment(pollId: Int, comment: String){
        launchCatching(
            onSuccess = {
                fetchPollComments(pollId)
            }
        ) {
            pollRepository.postComment(pollId, comment)
        }
    }

    fun onPointsReservedChanged(points: Int) {
        // Update the state with the new points value
        _state.update { currentState ->
            when (currentState) {
                is PollVoteScreenUiState.DiscretePoll -> currentState.copy(currentPointsReserved = points)
                is PollVoteScreenUiState.ContinuousPoll -> currentState.copy(currentPointsReserved = points)
                else -> currentState
            }
        }
    }


    fun onVoteInputChanged(voteInput: String) {
        _state.update { currentState ->
            when (currentState) {
                is PollVoteScreenUiState.DiscretePoll -> currentState.copy(currentVoteId = voteInput)
                is PollVoteScreenUiState.ContinuousPoll -> currentState.copy(currentVoteInput = voteInput)
                else -> currentState
            }
        }
    }


    fun onVotePressed(pollId: String, points: Int, voteInput: String) {
        when (_state.value) {
            is PollVoteScreenUiState.DiscretePoll -> {
                // Assuming voteInput is the id of the selected option in discrete polls
                voteForDiscretePoll(pollId, points, voteInput)
            }

            is PollVoteScreenUiState.ContinuousPoll -> {
                // For continuous polls, voteInput is the input value
                voteForContinuousPoll(pollId, points, voteInput)
            }

            else -> {
                // Handle other states if necessary
            }
        }
    }

    fun onReportPressed(pollId: String) {
        launchCatching(
            onSuccess = {
                _state.update { currentState ->
                    when (currentState) {
                        is PollVoteScreenUiState.DiscretePoll -> currentState.copy(toastMessage = "Successfully reported")
                        is PollVoteScreenUiState.ContinuousPoll -> currentState.copy(toastMessage = "Successfully reported")
                        else -> currentState
                    }
                }
            }
        ) {
            pollRepository.reportPoll(pollId)
        }
    }

    fun voteForDiscretePoll(pollId: String, points: Int, voteId: String) = viewModelScope.launch {
        when (val result = votePollUseCase.voteForDiscretePoll(pollId, points, voteId)) {
            is Result.Success -> {
                _state.update { (it as PollVoteScreenUiState.DiscretePoll).copy(toastMessage = "Successfully voted") }
            }

            is Result.Error -> {
                _state.update { (it as PollVoteScreenUiState.DiscretePoll).copy(toastMessage = "Error: ${result.exception.message}") }
            }
        }
    }

    fun voteForContinuousPoll(pollId: String, points: Int, voteInput: String) =
        viewModelScope.launch {
            when (val result = votePollUseCase.voteForContinuousPoll(pollId, points, voteInput)) {
                is Result.Success -> {
                    _state.update { (it as PollVoteScreenUiState.ContinuousPoll).copy(toastMessage = "Successfully voted") }
                }

                is Result.Error -> {
                    _state.update { (it as PollVoteScreenUiState.ContinuousPoll).copy(toastMessage = "Error: ${result.exception.message}") }
                }
            }
        }

    fun consumeToastMessage() = viewModelScope.launch {
        when (val state = _state.value) {
            is PollVoteScreenUiState.DiscretePoll -> {
                _state.update { state.copy(toastMessage = null) }
            }

            is PollVoteScreenUiState.ContinuousPoll -> {
                _state.update { state.copy(toastMessage = null) }
            }

            else -> {
                // do nothing
            }
        }
    }

}