package com.bounswe.predictionpolls.ui.feed

import com.bounswe.predictionpolls.domain.poll.Poll

sealed interface FeedUiState {
    data object Loading : FeedUiState
    data class HasFeed(
        val feed: List<Poll>,
        val feedPage: Int,
    ) : FeedUiState

    /**
     * Represents the case where there is no feed to show. This case is practically equivalent to HasFeed(emptyList()) but is used to make the code more readable.
     */
    data object NoFeed : FeedUiState

    data class Error(val message: String) : FeedUiState
}