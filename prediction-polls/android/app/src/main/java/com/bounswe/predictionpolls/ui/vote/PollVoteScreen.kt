package com.bounswe.predictionpolls.ui.vote

import android.widget.Toast
import androidx.compose.foundation.layout.Box
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.utils.shareLink

@Composable
fun PollVoteScreen(
    state: PollVoteScreenUiState,
    onPointsReservedChanged: (Int) -> Unit,
    onVotePressed: () -> Unit,
    onVoteInputChanged: (String) -> Unit,
    onToastConsumed: () -> Unit,
    onProfileCardClicked: (userName: String) -> Unit,
    onBackClicked: () -> Unit,
    onReportClicked: () -> Unit,
    onCommentPosted: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    when (state) {
        is PollVoteScreenUiState.Loading -> {
            VotePollLoadingComposable(modifier = modifier)
        }

        is PollVoteScreenUiState.Error -> {
            VotePollErrorComposable(modifier = modifier)
        }

        else -> {
            val context = LocalContext.current
            val frontEndUrl = stringResource(id = R.string.front_end_url)

            val poll = when (state) {
                is PollVoteScreenUiState.ContinuousPoll -> state.poll
                is PollVoteScreenUiState.DiscretePoll -> state.poll
                else -> null
            } ?: return

            val toastMessage = when (state) {
                is PollVoteScreenUiState.ContinuousPoll -> state.toastMessage
                is PollVoteScreenUiState.DiscretePoll -> state.toastMessage
                else -> null
            }

            LaunchedEffect(key1 = toastMessage) {
                toastMessage?.let {
                    Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
                    onToastConsumed()
                }
            }

            val points = when (state) {
                is PollVoteScreenUiState.ContinuousPoll -> state.currentPointsReserved
                is PollVoteScreenUiState.DiscretePoll -> state.currentPointsReserved
                else -> null
            }

            val selectedOption = when (state) {
                is PollVoteScreenUiState.DiscretePoll -> state.currentVoteId
                else -> null
            }

            val voteInput = when (state) {
                is PollVoteScreenUiState.ContinuousPoll -> state.currentVoteInput
                else -> null
            }.orEmpty()

            val comments = when (state) {
                is PollVoteScreenUiState.ContinuousPoll -> state.comments
                is PollVoteScreenUiState.DiscretePoll -> state.comments
                else -> null
            } ?: emptyList()

            PollVote(
                poll = poll,
                currentPointsReserved = points,
                onPointsReservedChanged = onPointsReservedChanged,
                onVotePressed = onVotePressed,
                onVoteInputChanged = onVoteInputChanged,
                onProfileCardClicked = onProfileCardClicked,
                onShareClicked = { context.shareLink(frontEndUrl + "/vote/" + poll.polId) },
                onBackClicked = onBackClicked,
                selectedOptionId = selectedOption,
                optionText = voteInput,
                onReportClicked = onReportClicked,
                comments = comments,
                onCommentPosted = onCommentPosted,
            )
        }
    }
}

@Composable
private fun VotePollErrorComposable(modifier: Modifier = Modifier) {
    Box(modifier = modifier) {
        Text(text = "An error occurred", modifier = Modifier.align(Alignment.Center))
    }
}

@Composable
private fun VotePollLoadingComposable(modifier: Modifier = Modifier) {
    Box(modifier = modifier) {
        CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
    }
}