package com.bounswe.predictionpolls.ui.moderation.vote

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
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll
import com.bounswe.predictionpolls.ui.common.CustomInputField
import com.bounswe.predictionpolls.ui.common.ErrorDialog
import com.bounswe.predictionpolls.ui.moderation.list.navigateToModerationScreen
import com.bounswe.predictionpolls.ui.signup.LoadingIndicator
import com.bounswe.predictionpolls.utils.DateTransformation

@Composable
fun ModerationVoteScreen(
    navController: NavController,
    viewModel: ModerationVoteScreenViewModel = hiltViewModel()
) {
    viewModel.screenState.request?.let {
        ModerationVoteScreenUI(
            request = it,
            error = viewModel.screenState.errorMessage,
            dismissErrorDialog = { viewModel.onEvent(ModerationVoteScreenEvent.DismissError) },
            selectedOptionId = viewModel.screenState.selectedOptionId,
            onOptionSelected = { viewModel.onEvent(ModerationVoteScreenEvent.OnOptionSelected(it)) },
            onResolveClicked = {
                viewModel.onEvent(ModerationVoteScreenEvent.OnResolveClicked {
                    navController.navigateToModerationScreen()
                })
            },
            onBackClicked = {
                navController.popBackStack()
            },
            onAgreeTermsClicked = {
                viewModel.onEvent(
                    ModerationVoteScreenEvent.OnAgreeTermsClicked(
                        it
                    )
                )
            },
            onEventHappenedClicked = {
                viewModel.onEvent(
                    ModerationVoteScreenEvent.OnEventHappenedClicked(
                        it
                    )
                )
            },
            onOptionTextChanged = {
                viewModel.onEvent(
                    ModerationVoteScreenEvent.OnOptionTextChanged(
                        it
                    )
                )
            },
            isAgreedTerms = viewModel.screenState.isAgreedTerms,
            isEventHappened = viewModel.screenState.isEventHappened,
            optionText = viewModel.screenState.givenOption ?: ""
        )
    } ?: run {
        Box(
            modifier = Modifier
                .fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column {
                Text(text = "Loading...")
                LoadingIndicator(isLoading = true)
            }
        }
    }
}

@Composable
private fun ModerationVoteScreenUI(
    request: ModeratorPoll,
    error: String? = null,
    dismissErrorDialog: () -> Unit = {},
    selectedOptionId: Int? = null,
    onOptionSelected: (Int) -> Unit = {},
    onBackClicked: () -> Unit = {},
    onResolveClicked: () -> Unit = {},
    isAgreedTerms: Boolean = false,
    onAgreeTermsClicked: (Boolean) -> Unit = {},
    isEventHappened: Boolean = false,
    onEventHappenedClicked: (Boolean) -> Unit = {},
    optionText: String = "",
    onOptionTextChanged: (String) -> Unit = {}
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
                text = "Moderation Resolve Request",
                color = MaterialTheme.colorScheme.primary,
                style = MaterialTheme.typography.titleLarge,
                fontSize = 20.sp,
                lineHeight = 24.sp,
                fontWeight = FontWeight.SemiBold,
            )
        }


        when (request.requestType) {
            ModeratorPoll.RequestType.REPORT -> {
                Text(
                    text = "This poll is reported by a user. Please check the validity of the report and resolve the request.",
                    color = Color.Black,
                    style = MaterialTheme.typography.titleMedium,
                    fontSize = 12.sp,
                    lineHeight = 16.sp,
                    fontWeight = FontWeight.Medium,
                    textAlign = TextAlign.Justify
                )
            }

            else -> {
                Text(
                    text = "Please check the status of the poll and choose the result of the poll if it the event is over.",
                    color = Color.Black,
                    style = MaterialTheme.typography.titleMedium,
                    fontSize = 12.sp,
                    lineHeight = 16.sp,
                    fontWeight = FontWeight.Medium,
                    textAlign = TextAlign.Justify
                )
            }
        }

        if (request.poll.tags.isNotEmpty()) {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                SectionHeader(text = "Poll Tags")
                Divider()
                Row(
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    request.poll.tags.forEach { tag ->
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
            Text(text = request.poll.question)
        }

        if (request.requestType == ModeratorPoll.RequestType.REPORT) {
            // TODO: Report reason should be fetched from backend
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                SectionHeader(text = "Report Reason")
                Divider()
                Text(text = "Report Reason")
            }
        } else {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                SectionHeader(text = "Poll Conclusion")
                Divider()
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Checkbox(
                        checked = isEventHappened,
                        onCheckedChange = onEventHappenedClicked
                    )
                    Spacer(modifier = Modifier.padding(horizontal = 4.dp))
                    Text(
                        text = "Did the event happen?",
                        color = Color.Black,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Medium,
                    )
                }
            }
        }

        Column(
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            val extraInfo =
                if (request.requestType == ModeratorPoll.RequestType.DISCRETE) " - (Choose Correct Option)" else " - (Type Correct Option)"
            SectionHeader(text = "Poll Options$extraInfo")
            Divider()
            PollOptions(
                request = request,
                selectedOptionId = selectedOptionId,
                onOptionSelected = onOptionSelected,
                onOptionTextChanged = onOptionTextChanged,
                optionText = optionText,
            )
        }

        Column(
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            SectionHeader(text = "Terms")
            Divider()
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Checkbox(
                    checked = isAgreedTerms,
                    onCheckedChange = onAgreeTermsClicked
                )
                Spacer(modifier = Modifier.padding(horizontal = 4.dp))
                Text(
                    text = "I agree to the",
                    color = Color.Black,
                    style = MaterialTheme.typography.titleMedium,
                    fontSize = 12.sp,
                    lineHeight = 16.sp,
                    fontWeight = FontWeight.SemiBold,
                )
                Spacer(modifier = Modifier.padding(horizontal = 3.dp))
                Text(
                    text = "Jury Rules",
                    color = MaterialTheme.colorScheme.primary,
                    style = MaterialTheme.typography.titleMedium,
                    fontSize = 12.sp,
                    lineHeight = 16.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.clickable {
                        //TODO: Navigate to Jury Rules
                    }
                )
            }
        }

        Box(
            modifier = Modifier.fillMaxWidth(),
            contentAlignment = Alignment.Center
        ) {
            Button(onClick = {
                onResolveClicked()
            }) {
                Text(text = "Resolve Request")
            }
        }
    }

    error?.let {
        ErrorDialog(
            error = it,
            onDismiss = { dismissErrorDialog() }
        )
    }
}

@Composable
private fun PollOptions(
    request: ModeratorPoll,
    selectedOptionId: Int? = null,
    onOptionSelected: (Int) -> Unit = {},
    optionText: String = "",
    onOptionTextChanged: (String) -> Unit = {}
) {
    if (request.requestType == ModeratorPoll.RequestType.CONTINUOUS) {
        CustomInputField(
            text = optionText,
            visualTransformation = if (request.poll.contPollType == "numeric") {
                VisualTransformation.None
            } else {
                DateTransformation()
            },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Number
            ),
            onTextChanged = onOptionTextChanged,
        )
    } else {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            request.poll.options.forEach {
                PollOption(
                    text = it.choiceText,
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
    Text(
        text = text,
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
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 18.sp,
        textAlign = TextAlign.Start,
        color = if (isSelected) MaterialTheme.colorScheme.onPrimary else Color.Black
    )
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