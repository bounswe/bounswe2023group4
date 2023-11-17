package com.bounswe.predictionpolls.ui.vote

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.common.poll.ContinuousVoteInputType
import com.bounswe.predictionpolls.ui.common.poll.ContinuousVoteOption
import com.bounswe.predictionpolls.ui.common.poll.PollComposable
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import java.util.Date

/**
 * This composable represents the vote screen for a poll.
 */
@Composable
fun PollVote(
    pollContent: @Composable () -> Unit,
    currentPointsReserved: Int,
    onPointsReservedChanged: (Int) -> Unit,
    onVotePressed: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier, horizontalAlignment = Alignment.CenterHorizontally) {
        pollContent()
        Text(
            text = stringResource(id = R.string.vote_screen_text),
            fontSize = 20.sp,
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.Medium,
            textAlign = TextAlign.Center,
        )
        Spacer(modifier = Modifier.height(16.dp))
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.Bottom) {
            VotePointInput(
                modifier = Modifier.weight(3f),
                currentPointsReserved = currentPointsReserved,
                onPointsReservedChanged = onPointsReservedChanged
            )
            Spacer(modifier = Modifier.weight(1f))
            VoteButton(onVotePressed = onVotePressed, modifier = Modifier.weight(3f))
        }

    }
}

@Composable
private fun VotePointInput(
    currentPointsReserved: Int,
    onPointsReservedChanged: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    ContinuousVoteOption(
        title = stringResource(id = R.string.poll_vote_input_title),
        vote = currentPointsReserved.toString(),
        isVotingEnabled = true,
        voteType = ContinuousVoteInputType.Number,
        onVoteInputChanged = { newPoints ->
            newPoints.toIntOrNull()?.let(onPointsReservedChanged)
        },
        modifier = modifier
    )
}

@Composable
private fun VoteButton(onVotePressed: () -> Unit, modifier: Modifier = Modifier) {
    val buttonShape = RoundedCornerShape(12.dp)
    Box(
        modifier = modifier
            .clickable(onClick = onVotePressed)
            .clip(buttonShape)
            .background(MaterialTheme.colorScheme.secondary)
            .aspectRatio(3f)
            .fillMaxWidth()
    ) {
        Text(
            text = stringResource(id = R.string.vote_screen_vote_button_text),
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.SemiBold,
            fontSize = 20.sp,
            color = MaterialTheme.colorScheme.onSecondary,
            modifier = Modifier
                .align(Alignment.Center)
        )
    }
}


@Preview(showSystemUi = true, showBackground = true)
@Composable
private fun PollVotePreview() {
    PredictionPollsTheme {
        PollVote(pollContent = {
            PollComposable(
                pollCreatorProfilePictureUri = "https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY",
                pollCreatorName = "Zehra Eser",
                tags = listOf("Basketball", "Cleveland Cavaliers", "Lebron James"),
                pollQuestionTitle = "Who is the best basketball player of all time?",
                optionsContent = { /*TODO*/ },
                dueDate = Date(),
                rejectionText = "Last 5 days",
                commentCount = 145
            )
        }, currentPointsReserved = 125, onPointsReservedChanged = {}, onVotePressed = {})
    }
}