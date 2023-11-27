package com.bounswe.predictionpolls.ui.vote

import com.bounswe.predictionpolls.domain.poll.Poll

sealed interface PollVoteScreenUiState {
    data object Loading : PollVoteScreenUiState
    data class Error(val message: String) : PollVoteScreenUiState
    data class DiscretePoll(
        val poll: Poll.DiscretePoll,
        val currentVoteId: String?,
        val currentPointsReserved: Int,
        val toastMessage: String?
    ) : PollVoteScreenUiState

    data class ContinuousPoll(
        val poll: Poll.ContinuousPoll,
        val currentVoteInput: String?,
        val currentPointsReserved: Int,
        val toastMessage: String?
    ) : PollVoteScreenUiState
}