package com.bounswe.predictionpolls.ui.create

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.common.CustomInputField
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import com.bounswe.predictionpolls.utils.DateTransformation

@Composable
fun CreatePollScreen(
    viewModel: CreatePollViewModel = hiltViewModel()
) {
    CreatePollScreenUI(
        question = viewModel.screenState.question,
        onQuestionChanged = { viewModel.onEvent(CreatePollScreenEvent.OnQuestionChanged(it)) },
        activePollType = viewModel.screenState.pollType,
        onPollTypeChanged = { viewModel.onEvent(CreatePollScreenEvent.OnPollTypeChanged(it)) },
        options = viewModel.screenState.discreteOptions,
        onOptionChanged = { option, position ->
            viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionChanged(option, position))
        },
        onOptionAdded = { viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionAdded) },
        onOptionRemoved = { viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionRemoved(it)) },
        activeInputType = viewModel.screenState.continuousInputType,
        onInputTypeChanged = { viewModel.onEvent(CreatePollScreenEvent.OnContinuousInputTypeChanged(it)) },
        isDueDateChecked = viewModel.screenState.isDueDateEnabled,
        onDueDateChecked = { viewModel.onEvent(CreatePollScreenEvent.OnDueDateChecked(it)) },
        lastAcceptValue = viewModel.screenState.dueDate,
        onLastAcceptValueChanged = { viewModel.onEvent(CreatePollScreenEvent.OnDueDateChanged(it)) },
        isDistributionVisible = viewModel.screenState.isDistributionVisible,
        onDistributionVisibilityChanged = { viewModel.onEvent(CreatePollScreenEvent.OnDistributionVisibilityChanged(it)) },
        onCreatePollClicked = { viewModel.onEvent(CreatePollScreenEvent.OnCreatePollClicked) },
    )
}

@Composable
private fun CreatePollScreenUI(
    question: String = "",
    onQuestionChanged: (String) -> Unit = {},
    activePollType: CreatePollScreenState.PollType = CreatePollScreenState.PollType.DISCRETE,
    onPollTypeChanged: (CreatePollScreenState.PollType) -> Unit = {},
    options: List<String> = listOf(""),
    onOptionChanged: (String, Int) -> Unit = { _, _ -> },
    onOptionAdded: () -> Unit = {},
    onOptionRemoved: (Int) -> Unit = {},
    activeInputType: CreatePollScreenState.ContinuousInputType = CreatePollScreenState.ContinuousInputType.DATE,
    onInputTypeChanged: (CreatePollScreenState.ContinuousInputType) -> Unit = {},
    isDueDateChecked: Boolean = false,
    onDueDateChecked: (Boolean) -> Unit = {},
    lastAcceptValue: String = "",
    onLastAcceptValueChanged: (String) -> Unit = {},
    isDistributionVisible: Boolean = false,
    onDistributionVisibilityChanged: (Boolean) -> Unit = {},
    onCreatePollClicked: () -> Unit = {},
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 24.dp, start = 16.dp, end = 16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        ScreenHeader()
        CustomInputField(
            modifier = Modifier.fillMaxWidth(),
            labelId = R.string.poll_create_screen_question,
            text = question,
            onTextChanged = onQuestionChanged,
        )
        PollTypeChoice(
            activePollType = activePollType,
            onPollTypeChanged = onPollTypeChanged,
        )
        if (activePollType == CreatePollScreenState.PollType.DISCRETE) {
            DiscretePollOptions(
                options = options,
                onOptionChanged = onOptionChanged,
                onOptionAdded = onOptionAdded,
                onOptionRemoved = onOptionRemoved,
            )
        } else {
            ContinuousPollInputType(
                activeInputType = activeInputType,
                onInputTypeChanged = onInputTypeChanged,
            )
        }
        DueDateRow(
            isDueDateChecked = isDueDateChecked,
            onDueDateChecked = onDueDateChecked,
        )
        PollEndTime(
            lastAcceptValue = lastAcceptValue,
            onLastAcceptValueChanged = onLastAcceptValueChanged,
        )
        DistributionVisibility(
            isDistributionVisible = isDistributionVisible,
            onDistributionVisibilityChanged = onDistributionVisibilityChanged,
        )
        Row(
            modifier = Modifier.fillMaxWidth()
        ) {
            Spacer(modifier = Modifier.weight(1f))
            TextButton(
                onClick = {
                    onCreatePollClicked()
                },
                colors = ButtonDefaults.textButtonColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                ),
                shape = RoundedCornerShape(8.dp),
            ) {
                Text(
                    modifier = Modifier.padding(vertical = 6.dp, horizontal = 12.dp),
                    text = stringResource(id = R.string.poll_create_action),
                    color = MaterialTheme.colorScheme.onPrimary,
                    style = MaterialTheme.typography.titleLarge,
                    fontSize = 14.sp,
                    lineHeight = 17.sp
                )
            }
        }
    }
}

@Composable
private fun PollTypeChoice(
    activePollType: CreatePollScreenState.PollType = CreatePollScreenState.PollType.DISCRETE,
    onPollTypeChanged: (CreatePollScreenState.PollType) -> Unit = {},
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = stringResource(id = R.string.poll_create_screen_type),
            color = MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 14.sp,
            lineHeight = 17.sp
        )
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            CreatePollScreenState.PollType.entries.forEach {
                TextButton(
                    onClick = {
                        onPollTypeChanged(it)
                    },
                    colors = ButtonDefaults.textButtonColors(
                        containerColor = if (activePollType == it) {
                            MaterialTheme.colorScheme.primary
                        } else {
                            MaterialTheme.colorScheme.primary.copy(alpha = 0.7f)
                        },
                    ),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        modifier = Modifier.padding(vertical = 6.dp, horizontal = 12.dp),
                        text = it.type,
                        color = MaterialTheme.colorScheme.onPrimary,
                        style = MaterialTheme.typography.titleLarge,
                        fontSize = 14.sp,
                        lineHeight = 17.sp
                    )
                }
            }
        }
    }
}

@Composable
private fun ScreenHeader() {
    Text(
        text = stringResource(id = R.string.poll_create_screen_title),
        color = MaterialTheme.colorScheme.primary,
        style = MaterialTheme.typography.titleLarge,
        fontSize = 20.sp,
        lineHeight = 24.sp
    )
}

@Composable
private fun DiscretePollOptions(
    options: List<String>,
    onOptionChanged: (String, Int) -> Unit = { _, _ -> },
    onOptionAdded: () -> Unit = {},
    onOptionRemoved: (Int) -> Unit = {},
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = stringResource(id = R.string.poll_create_screen_enter_options),
            color = MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 14.sp,
            lineHeight = 17.sp
        )
        options.forEachIndexed { index, option ->
            CustomInputField(
                modifier = Modifier.fillMaxWidth(),
                text = option,
                onTextChanged = { onOptionChanged(it, index) },
                trailingIconId = R.drawable.ic_delete,
                trailingIconContentDescription = R.string.poll_create_screen_cd_delete,
                onTrailingIconClicked = { onOptionRemoved(index) },
            )
        }
        Row(
            modifier = Modifier.fillMaxWidth(),
        ) {
            Spacer(modifier = Modifier.weight(1f))
            TextButton(
                onClick = {
                    onOptionAdded()
                },
                colors = ButtonDefaults.textButtonColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                ),
                shape = RoundedCornerShape(8.dp),
            ) {
                Text(
                    modifier = Modifier.padding(vertical = 6.dp, horizontal = 12.dp),
                    text = stringResource(id = R.string.poll_create_screen_add_options),
                    color = MaterialTheme.colorScheme.onPrimary,
                    style = MaterialTheme.typography.titleLarge,
                    fontSize = 14.sp,
                    lineHeight = 17.sp
                )
            }
        }
    }
}

@Composable
private fun DueDateRow(
    isDueDateChecked: Boolean,
    onDueDateChecked: (Boolean) -> Unit = {},
    dueDate: String = "",
    onDueDateChanged: (String) -> Unit = {},
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(checked = isDueDateChecked, onCheckedChange = onDueDateChecked)
            Text(
                text = stringResource(id = R.string.poll_create_due_date),
                color = MaterialTheme.colorScheme.onBackground,
                style = MaterialTheme.typography.titleLarge,
                fontSize = 14.sp,
                lineHeight = 17.sp
            )
        }
        Spacer(modifier = Modifier.width(32.dp))
        if (isDueDateChecked) {
            CustomInputField(
                text = dueDate,
                onTextChanged = onDueDateChanged,
                trailingIconId = R.drawable.ic_calendar,
                trailingIconContentDescription = R.string.cd_calendar,
                visualTransformation = DateTransformation(),
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Number
                ),
            )
        } else {
            Spacer(modifier = Modifier.weight(1f))
        }
    }
}

@Composable
private fun PollEndTime(
    lastAcceptValue: String = "",
    onLastAcceptValueChanged: (String) -> Unit = {},
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = stringResource(id = R.string.poll_create_screen_poll_end),
            color = MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 14.sp,
            lineHeight = 17.sp
        )
        Spacer(modifier = Modifier.weight(1f))
        CustomInputField(
            text = lastAcceptValue,
            onTextChanged = onLastAcceptValueChanged,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Number
            ),
        )
    }
}

@Composable
private fun DistributionVisibility(
    isDistributionVisible: Boolean,
    onDistributionVisibilityChanged: (Boolean) -> Unit = {},
) {
    Row(
        verticalAlignment = Alignment.CenterVertically
    ) {
        Checkbox(checked = isDistributionVisible, onCheckedChange = onDistributionVisibilityChanged)
        Text(
            text = stringResource(id = R.string.poll_create_screen_distribution_visibility),
            color = MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 14.sp,
            lineHeight = 17.sp
        )
    }
}

@Composable
private fun ContinuousPollInputType(
    activeInputType: CreatePollScreenState.ContinuousInputType = CreatePollScreenState.ContinuousInputType.DATE,
    onInputTypeChanged: (CreatePollScreenState.ContinuousInputType) -> Unit = {},
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = stringResource(id = R.string.poll_create_screen_choose_continuous_type),
            color = MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 14.sp,
            lineHeight = 17.sp
        )
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            CreatePollScreenState.ContinuousInputType.entries.forEach {
                TextButton(
                    onClick = {
                        onInputTypeChanged(it)
                    },
                    colors = ButtonDefaults.textButtonColors(
                        containerColor = if (activeInputType == it) {
                            MaterialTheme.colorScheme.primary
                        } else {
                            MaterialTheme.colorScheme.primary.copy(alpha = 0.7f)
                        },
                    ),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        modifier = Modifier.padding(vertical = 6.dp, horizontal = 12.dp),
                        text = it.type,
                        color = MaterialTheme.colorScheme.onPrimary,
                        style = MaterialTheme.typography.titleLarge,
                        fontSize = 14.sp,
                        lineHeight = 17.sp
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun CreatePollScreenPreview() {
    PredictionPollsTheme {
        CreatePollScreenUI()
    }
}