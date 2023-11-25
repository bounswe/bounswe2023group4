package com.bounswe.predictionpolls.ui.vote

import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.composable

const val POLL_VOTE_ROUTE = "pollVote"

fun NavGraphBuilder.pollVoteScreen(navController: NavController) {
    composable(POLL_VOTE_ROUTE) {
        val pollVoteViewModel: PollVoteViewModel = hiltViewModel()
        val pollId: String = "" // TODO: Fetch this from navcontroller
        // Accessing state from ViewModel
        val state by pollVoteViewModel.state.collectAsStateWithLifecycle()
        LaunchedEffect(key1 = Unit) {
            pollVoteViewModel.fetchPoll(pollId)
        }

        // PollVoteScreen Composable
        PollVoteScreen(
            state = state,
            onPointsReservedChanged = { points ->
                pollVoteViewModel.onPointsReservedChanged(points)
            },
            onVotePressed = {
                // Assuming you have pollId, points, and voteInput available
                when (state) {
                    is PollVoteScreenUiState.DiscretePoll -> {
                        val pollId = (state as PollVoteScreenUiState.DiscretePoll).poll.polId
                        val points =
                            (state as PollVoteScreenUiState.DiscretePoll).currentPointsReserved
                        val voteInput = (state as PollVoteScreenUiState.DiscretePoll).currentVoteId
                        voteInput?.let {
                            pollVoteViewModel.onVotePressed(pollId, points, voteInput)
                        }
                    }

                    is PollVoteScreenUiState.ContinuousPoll -> {
                        val pollId = (state as PollVoteScreenUiState.ContinuousPoll).poll.polId
                        val points =
                            (state as PollVoteScreenUiState.ContinuousPoll).currentPointsReserved
                        val voteInput =
                            (state as PollVoteScreenUiState.ContinuousPoll).currentVoteInput
                        voteInput?.let {
                            pollVoteViewModel.onVotePressed(pollId, points, voteInput)
                        }
                    }

                    else -> {
                    }
                }
            },
            onVoteInputChanged = { voteInput ->
                pollVoteViewModel.onVoteInputChanged(voteInput)
            },
        )
    }
}
