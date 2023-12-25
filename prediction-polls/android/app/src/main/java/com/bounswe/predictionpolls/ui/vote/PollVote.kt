package com.bounswe.predictionpolls.ui.vote

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.domain.poll.Comment
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.extensions.fromISO8601
import com.bounswe.predictionpolls.ui.common.CustomInputField
import com.bounswe.predictionpolls.ui.common.annotation.AnnotatableText
import com.bounswe.predictionpolls.ui.common.annotation.AnnotationDialog
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
    onReportClicked: () -> Unit,
    selectedOptionId: String?,
    optionText: String,
    comments: List<Comment>,
    onCommentPosted: (String) -> Unit
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
        onProfileCardClicked = onProfileCardClicked,
        onReportClicked = onReportClicked,
        comments = comments,
        onCommentPosted = onCommentPosted
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
    onReportClicked: () -> Unit = {},
    onProfileCardClicked: (userName: String) -> Unit = {},
    comments: List<Comment> = emptyList(),
    onCommentPosted: (String) -> Unit = {}
) {
    var isAnnotationDialogOpen by remember { mutableStateOf(false) }
    var isMessagesExpanded by remember { mutableStateOf(false) }
    var currentComment by remember { mutableStateOf("") }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(vertical = 16.dp, horizontal = 16.dp),
    ) {
        item {
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
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = poll.pollCreatorName,
                        fontFamily = MontserratFontFamily,
                        color = MaterialTheme.colorScheme.scrim,
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                    )
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }

        if (poll.tags.isNotEmpty()) {
            item {
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
            item {
                Spacer(modifier = Modifier.height(24.dp))
            }
        }

        item {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                SectionHeader(text = "Poll Question")
                Divider()
                AnnotatableText(
                    text = AnnotatedString(poll.pollQuestionTitle),
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }

        item {
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
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }

        item {
            PollTimeDetails(poll = poll)
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }

        item {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                SectionHeader(text = "Vote Points")
                Divider()
                if (poll.isOpen) {
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
                        Button(
                            onClick = onVotePressed,
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text(text = "Vote")
                        }
                    }
                } else {
                    Text(
                        text = "Voting is closed for this poll.",
                        fontFamily = MontserratFontFamily,
                        color = MaterialTheme.colorScheme.error,
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                    )
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }

        item {
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    SectionHeader(text = "Messages")
                    IconButton(
                        onClick = {
                            isMessagesExpanded = !isMessagesExpanded
                        }
                    ) {
                        Icon(
                            painter = painterResource(id = R.drawable.ic_back),
                            contentDescription = null,
                            modifier = Modifier.rotate(
                                if (isMessagesExpanded) 90f else -90f
                            )
                        )
                    }
                }
                Divider()
            }
        }
        if (isMessagesExpanded) {
            item {
                Spacer(modifier = Modifier.height(8.dp))
            }
            item {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    CustomInputField(
                        text = currentComment,
                        onTextChanged = {
                            currentComment = it
                        },
                        modifier = Modifier.weight(1f)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Button(
                        onClick = {
                            onCommentPosted(currentComment)
                            currentComment = ""
                        },
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(text = "Post")
                    }
                }
            }
            item {
                Spacer(modifier = Modifier.height(8.dp))
            }
            items(comments) {
                Row {
                    AnnotatableText(
                        text = buildAnnotatedString {
                            withStyle(
                                style = SpanStyle(
                                    fontFamily = MontserratFontFamily,
                                    fontWeight = FontWeight.SemiBold,
                                    fontSize = 14.sp,
                                    color = MaterialTheme.colorScheme.primary
                                )
                            ) {
                                append("${it.username}: ")
                            }
                            withStyle(
                                style = SpanStyle(
                                    fontFamily = MontserratFontFamily,
                                    fontWeight = FontWeight.Medium,
                                    fontSize = 12.sp,
                                )
                            ){
                                append(it.comment)
                            }
                        },
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Spacer(modifier = Modifier.weight(1f))
                Button(
                    onClick = {
                        isAnnotationDialogOpen = true
                    },
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(text = "Annotations")
                }
                Image(
                    painter = painterResource(
                        id = R.drawable.ic_warning,
                    ),
                    contentDescription = null,
                    modifier = Modifier
                        .background(
                            MaterialTheme.colorScheme.error,
                            RoundedCornerShape(12.dp)
                        )
                        .clip(RoundedCornerShape(12.dp))
                        .clickable(onClick = onReportClicked)
                        .padding(8.dp)
                        .size(24.dp)
                )
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

    if (isAnnotationDialogOpen) {
        AnnotationDialog(
            onDismissRequest = { isAnnotationDialogOpen = false },
        )
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
            text = AnnotatedString(text),
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