package com.bounswe.predictionpolls.ui.vote

import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.bounswe.predictionpolls.domain.annotation.PollAnnotationPages
import com.bounswe.predictionpolls.ui.common.annotation.AnnotationViewModel
import com.bounswe.predictionpolls.ui.profile.navigateToProfileScreen

const val POLL_VOTE_ROUTE = "pollVote/{pollId}"

fun NavGraphBuilder.pollVoteScreen(navController: NavController) {
    composable(
        POLL_VOTE_ROUTE, arguments = listOf(navArgument("pollId") { type = NavType.StringType })
    ) {
        val pollVoteViewModel: PollVoteViewModel = hiltViewModel()
        val annotationViewModel: AnnotationViewModel = hiltViewModel()
        // Accessing state from ViewModel
        val pollId = it.arguments?.getString("pollId") ?: "" // Default value as fallback

        LaunchedEffect(pollId){
            annotationViewModel.getAnnotations(
                PollAnnotationPages.VOTE(pollId.toInt())
            )
        }

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
            onProfileCardClicked = {
                navController.navigateToProfileScreen(username = it)
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
            onToastConsumed = {
                pollVoteViewModel.consumeToastMessage()
            },
            onBackClicked = {
                navController.popBackStack()
            },
            onReportClicked = {
                pollVoteViewModel.onReportPressed(pollId)
            }
        )
    }
}


fun NavController.navigateToPollVoteScreen(pollId: String) {
    this.navigate("pollVote/$pollId")
}