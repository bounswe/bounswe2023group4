package com.bounswe.predictionpolls.ui.common.poll

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.poll.PollOption
import com.bounswe.predictionpolls.extensions.fromISO8601
import com.bounswe.predictionpolls.utils.shareLink
import kotlinx.collections.immutable.ImmutableList


/**
 * Displays polls in a lazy list. This composable can be used in profile screen and feed screen where continuous flow of polls are expected.
 */
@Composable
fun Polls(
    polls: ImmutableList<Poll>,
    onProfileClicked: (userName: String) -> Unit,
    modifier: Modifier = Modifier,
    onPollClicked: (id: String) -> Unit = {},
) {
    val context = LocalContext.current
    LazyColumn(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(polls) {
            val frontEndUrl = stringResource(id = R.string.front_end_url)
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
                        is Poll.ContinuousPoll -> {}

                        is Poll.DiscretePoll -> {
                            ReadOnlyDiscretePollOptions(it.options)
                        }
                    }
                },
                dueDate = it.dueDate?.fromISO8601() ?: "",
                rejectionText = it.rejectionText ?: "",
                commentCount = it.commentCount,
                onProfileCardClicked = {
                    onProfileClicked(it.pollCreatorUsername)
                },
                onShareClicked = {
                    context.shareLink(frontEndUrl+ "/vote/" + it.polId)
                },
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

    Column(
        modifier,
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
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
