package com.bounswe.predictionpolls.ui.common.poll

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.poll.PollOption
import kotlinx.collections.immutable.ImmutableList


/**
 * Displays polls in a lazy list. This composable can be used in profile screen and feed screen where continuous flow of polls are expected.
 */
@Composable
fun Polls(
    polls: ImmutableList<Poll>,
    onPollClicked: (id: String) -> Unit = {},
    modifier: Modifier = Modifier
) {
    LazyColumn(modifier = modifier) {
        items(polls) {
            PollComposable(
                modifier = Modifier.clickable {
                    onPollClicked(it.polId)
                },
                pollCreatorProfilePictureUri = it.creatorProfilePictureUri,
                pollCreatorName = it.pollCreatorName,
                tags = it.tags,
                pollQuestionTitle = it.pollQuestionTitle,
                optionsContent = {
                    when (it) {
                        is Poll.ContinuousPoll -> {
                            ContinuousVoteOption(
                                title = "Enter your vote",
                                vote = "",
                                isVotingEnabled = false,
                                voteType = it.inputType,
                                onVoteInputChanged = {}
                            )
                        }

                        is Poll.DiscretePoll -> {
                            ReadOnlyDiscretePollOptions(it.options)
                        }
                    }
                },
                dueDate = it.dueDate ?: "",
                rejectionText = it.rejectionText ?: "",
                commentCount = it.commentCount
            )
        }
    }
}

@Composable
fun ReadOnlyDiscretePollOptions(
    options: ImmutableList<PollOption.DiscreteOption>,
    modifier: Modifier = Modifier
) {
    val totalVotes = remember(options) {
        val sum = options.sumOf { it.voteCount }
        if (sum == 0) {
            1
        } else sum
    }

    Column(modifier) {
        options.forEach {
            DiscreteVoteOption(
                optionName = it.text,
                voteCount = it.voteCount,
                fillPercentage = it.voteCount.toFloat() / totalVotes,
                isSelected = false
            )
        }
    }
}
