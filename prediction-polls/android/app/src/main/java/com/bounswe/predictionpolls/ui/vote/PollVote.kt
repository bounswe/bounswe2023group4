package com.bounswe.predictionpolls.ui.vote

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.extensions.fromISO8601
import com.bounswe.predictionpolls.ui.common.CustomInputField
import com.bounswe.predictionpolls.ui.common.annotation.AnnotatableText
import com.bounswe.predictionpolls.ui.common.poll.ContinuousVoteOption
import com.bounswe.predictionpolls.ui.common.poll.PollProfilePicture
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily

@Composable
fun PollVote(
    poll: Poll,
    currentPointsReserved: Int?,
    onPointsReservedChanged: (Int) -> Unit,
    onVoteInputChanged: (String) -> Unit,
    onProfileCardClicked: (userName: String) -> Unit,
    onShareClicked: () -> Unit,
    onVotePressed: () -> Unit,
    onBackClicked: () -> Unit,
    selectedOptionId: String?,
    optionText: String
) {
    PollVoteUI(
        poll = poll,
        onBackClicked = onBackClicked,
        onVotePressed = onVotePressed,
        selectedOptionId = selectedOptionId,
        onOptionSelected = onVoteInputChanged,
        optionText = optionText,
        onOptionTextChanged = onVoteInputChanged,
        votePoints = currentPointsReserved,
        onVotePointsChanged = {
            it.toIntOrNull()?.let { newPoints ->
                onPointsReservedChanged(newPoints)
            }
        },
        onShareClicked = onShareClicked,
        onProfileCardClicked = onProfileCardClicked
    )
}

@Composable
private fun PollVoteUI(
    poll: Poll,
    onBackClicked: () -> Unit = {},
    selectedOptionId: String? = null,
    onOptionSelected: (String) -> Unit = {},
    optionText: String = "",
    onOptionTextChanged: (String) -> Unit = {},
    votePoints: Int? = null,
    onVotePointsChanged: (String) -> Unit = {},
    onVotePressed: () -> Unit = {},
    onShareClicked: () -> Unit = {},
    onProfileCardClicked: (userName: String) -> Unit = {}
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .scrollable(scrollState, Orientation.Vertical)
            .padding(vertical = 16.dp, horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = { onBackClicked() }
            ) {
                Icon(
                    painter = painterResource(id = R.drawable.ic_back),
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary
                )
            }
            Text(
                text = "Poll Details",
                color = MaterialTheme.colorScheme.primary,
                style = MaterialTheme.typography.titleLarge,
                fontSize = 20.sp,
                lineHeight = 24.sp,
                fontWeight = FontWeight.SemiBold,
            )
            Spacer(modifier = Modifier.weight(1f))
            Row(
                modifier = Modifier.clickable { onProfileCardClicked(poll.pollCreatorUsername) },
                verticalAlignment = Alignment.CenterVertically
            ) {
                PollProfilePicture(
                    imageUri = poll.creatorProfilePictureUri,
                    modifier = Modifier.size(32.dp)
                )
                Spacer(modifier = Modifier.width(16.dp))
                Text(
                    text = poll.pollCreatorName,
                    fontFamily = MontserratFontFamily,
                    color = MaterialTheme.colorScheme.scrim,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                )
            }
        }

        if (poll.tags.isNotEmpty()) {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                SectionHeader(text = "Poll Tags")
                Divider()
                Row(
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    poll.tags.forEach { tag ->
                        Box(
                            modifier = Modifier
                                .background(
                                    MaterialTheme.colorScheme.primary,
                                    RoundedCornerShape(8.dp)
                                )
                                .padding(vertical = 8.dp, horizontal = 12.dp)
                        ) {
                            Text(text = tag, color = Color.White)
                        }
                    }
                }
            }
        }

        Column(
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            SectionHeader(text = "Poll Question")
            Divider()
            AnnotatableText(
                text = poll.pollQuestionTitle,
            )
        }

        Column(
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            val extraInfo =
                if (poll is Poll.DiscretePoll) " - (Choose Correct Option)" else " - (Type Your Answer)"
            SectionHeader(text = "Poll Options$extraInfo")
            Divider()
            PollOptions(
                poll = poll,
                selectedOptionId = selectedOptionId,
                onOptionSelected = onOptionSelected,
                onOptionTextChanged = onOptionTextChanged,
                optionText = optionText,
            )
        }

        PollTimeDetails(poll = poll)

        Column(
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            SectionHeader(text = "Vote Points")
            Divider()
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                CustomInputField(
                    text = votePoints.toString(),
                    onTextChanged = onVotePointsChanged,
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Number
                    ),
                    modifier = Modifier.weight(1f)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Button(onClick = onVotePressed) {
                    Text(text = "Vote")
                }
            }
        }

        Spacer(modifier = Modifier.weight(1f))
        Row(
            modifier = Modifier.fillMaxWidth()
        ) {
            Spacer(modifier = Modifier.weight(1f))
            Image(
                painter = painterResource(
                    id = R.drawable.ic_share,
                ),
                contentDescription = null,
                modifier = Modifier
                    .background(
                        MaterialTheme.colorScheme.primary,
                        RoundedCornerShape(12.dp)
                    )
                    .clip(RoundedCornerShape(12.dp))
                    .clickable(onClick = onShareClicked)
                    .padding(8.dp)
                    .size(24.dp)
            )
        }
    }
}

@Composable
private fun PollTimeDetails(
    poll: Poll
) {
    if (poll.dueDate.orEmpty().isEmpty() && poll.rejectionText.orEmpty().isEmpty()) {
        return
    }

    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        SectionHeader(text = "Poll Time Details")
        Divider()
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight()
                .padding(vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceAround
        ) {
            if (poll.dueDate.orEmpty().isNotEmpty()) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Closing in",
                        fontFamily = MontserratFontFamily,
                        color = MaterialTheme.colorScheme.scrim,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center,
                        fontSize = 14.sp
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = poll.dueDate?.fromISO8601().orEmpty(),
                        fontFamily = MontserratFontFamily,
                        color = MaterialTheme.colorScheme.error,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center,
                        fontSize = 14.sp
                    )
                }
            }
            if (poll.rejectionText.orEmpty().isNotEmpty()) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Reject votes in",
                        fontFamily = MontserratFontFamily,
                        color = MaterialTheme.colorScheme.scrim,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center,
                        fontSize = 14.sp
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = poll.rejectionText.orEmpty(),
                        fontFamily = MontserratFontFamily,
                        color = MaterialTheme.colorScheme.error,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center,
                        fontSize = 14.sp
                    )
                }
            }
        }
    }
}

@Composable
private fun PollOptions(
    poll: Poll,
    selectedOptionId: String? = null,
    onOptionSelected: (String) -> Unit = {},
    optionText: String = "",
    onOptionTextChanged: (String) -> Unit = {}
) {
    if (poll is Poll.ContinuousPoll) {
        ContinuousVoteOption(
            vote = optionText,
            isVotingEnabled = true,
            voteType = poll.inputType,
            onVoteInputChanged = onOptionTextChanged
        )
    } else {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            (poll as Poll.DiscretePoll).options.forEach {
                PollOption(
                    text = it.text,
                    isSelected = selectedOptionId == it.id,
                    onClick = { onOptionSelected(it.id) }
                )
            }
        }
    }
}

@Composable
fun PollOption(
    text: String,
    isSelected: Boolean = false,
    onClick: () -> Unit = {}
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.primary,
                shape = RoundedCornerShape(8.dp)
            )
            .background(
                if (isSelected) MaterialTheme.colorScheme.primary else Color.Transparent,
                RoundedCornerShape(8.dp)
            )
            .clip(RoundedCornerShape(8.dp))
            .clickable(onClick = onClick)
            .padding(vertical = 8.dp, horizontal = 12.dp),
    ) {
        AnnotatableText(
            text = text,
            style = TextStyle(
                fontWeight = FontWeight.Medium,
                fontSize = 14.sp,
                lineHeight = 18.sp,
                textAlign = TextAlign.Start,
                color = if (isSelected) MaterialTheme.colorScheme.onPrimary else Color.Black
            ),
            onClick = onClick
        )
    }
}

@Composable
private fun SectionHeader(
    text: String
) {
    Text(
        text = text,
        color = MaterialTheme.colorScheme.primary,
        style = MaterialTheme.typography.titleLarge,
        fontSize = 16.sp,
        lineHeight = 20.sp,
        fontWeight = FontWeight.Medium,
    )
}