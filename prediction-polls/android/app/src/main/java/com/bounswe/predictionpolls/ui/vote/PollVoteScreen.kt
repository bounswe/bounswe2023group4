package com.bounswe.predictionpolls.ui.vote

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.bounswe.predictionpolls.ui.common.poll.ContinuousVoteOption
import com.bounswe.predictionpolls.ui.common.poll.DiscreteVoteOption
import com.bounswe.predictionpolls.ui.common.poll.PollComposable

@Composable
fun PollVoteScreen(
    state: PollVoteScreenUiState,
    onPointsReservedChanged: (Int) -> Unit,
    onVotePressed: () -> Unit,
    onVoteInputChanged: (String) -> Unit, // either the vote input or the selected option id is passed as a string
    modifier: Modifier = Modifier
) {
    when (state) {
        is PollVoteScreenUiState.Loading -> {
            VotePollLoadingComposable(modifier = modifier)
        }

        is PollVoteScreenUiState.Error -> {
            VotePollErrorComposable(modifier = modifier)
        }

        is PollVoteScreenUiState.DiscretePoll -> {
            PollVote(
                pollContent = {
                    val poll = state.poll
                    PollComposable(
                        pollCreatorProfilePictureUri = poll.creatorProfilePictureUri,
                        pollCreatorName = poll.pollCreatorName,
                        tags = poll.tags,
                        pollQuestionTitle = poll.pollQuestionTitle,
                        optionsContent = {
                            val sumOfTotalVotes = remember(poll.options) {
                                val sum = poll.options.sumOf { it.voteCount }
                                if (sum == 0) -1 else sum// to prevent division by 0
                            }
                            poll.options.forEachIndexed { index, discreteOption ->
                                DiscreteVoteOption(
                                    optionName = discreteOption.text,
                                    voteCount = discreteOption.voteCount,
                                    fillPercentage = discreteOption.voteCount / sumOfTotalVotes.toFloat(),
                                    isSelected = discreteOption.id == state.currentVoteId,
                                    optionPrefix = (10 + index).toChar().toString() + ") ",
                                    modifier = Modifier.clickable {
                                        onVoteInputChanged(discreteOption.id)
                                    }
                                )
                            }
                        },
                        dueDate = poll.dueDate ?: "",
                        rejectionText = poll.rejectionText ?: "",
                        commentCount = 0
                    )
                },
                currentPointsReserved = state.currentPointsReserved,
                onPointsReservedChanged = onPointsReservedChanged,
                onVotePressed = onVotePressed,
                modifier = modifier
            )

        }

        is PollVoteScreenUiState.ContinuousPoll -> {
            val poll = state.poll
            PollComposable(
                pollCreatorProfilePictureUri = poll.creatorProfilePictureUri,
                pollCreatorName = poll.pollCreatorName,
                tags = poll.tags,
                pollQuestionTitle = poll.pollQuestionTitle,
                optionsContent = {
                    ContinuousVoteOption(
                        title = "Enter your vote",
                        vote = state.currentVoteInput ?: "",
                        isVotingEnabled = true,
                        voteType = poll.inputType,
                        onVoteInputChanged = onVoteInputChanged
                    )
                },
                dueDate = poll.dueDate ?: "",
                rejectionText = poll.rejectionText ?: "",
                commentCount = 0
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