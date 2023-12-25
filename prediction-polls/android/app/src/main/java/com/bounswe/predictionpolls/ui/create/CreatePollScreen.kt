package com.bounswe.predictionpolls.ui.create

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Divider
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.PopupProperties
import androidx.hilt.navigation.compose.hiltViewModel
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.domain.semantic.SemanticTag
import com.bounswe.predictionpolls.ui.common.CustomDatePicker
import com.bounswe.predictionpolls.ui.common.CustomInputField
import com.bounswe.predictionpolls.ui.common.ErrorDialog
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import com.bounswe.predictionpolls.utils.DateTransformation

@Composable
fun CreatePollScreen(
    viewModel: CreatePollViewModel = hiltViewModel()
) {
    val successfulCreateText = stringResource(id = R.string.poll_create_successful)
    val context = LocalContext.current

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
        onInputTypeChanged = {
            viewModel.onEvent(
                CreatePollScreenEvent.OnContinuousInputTypeChanged(
                    it
                )
            )
        },
        isDueDateChecked = viewModel.screenState.isDueDateEnabled,
        onDueDateChecked = { viewModel.onEvent(CreatePollScreenEvent.OnDueDateChecked(it)) },
        dueDate = viewModel.screenState.dueDate,
        onDueDateChanged = { viewModel.onEvent(CreatePollScreenEvent.OnDueDateChanged(it)) },
        lastAcceptValue = viewModel.screenState.lastAcceptValue,
        onLastAcceptValueChanged = {
            viewModel.onEvent(
                CreatePollScreenEvent.OnLastAcceptValueChanged(
                    it
                )
            )
        },
        selectedLastAcceptValueType = viewModel.screenState.acceptValueType,
        onLastAcceptValueTypeChanged = {
            viewModel.onEvent(
                CreatePollScreenEvent.OnAcceptValueTypeChanged(
                    it
                )
            )
        },
        isDistributionVisible = viewModel.screenState.isDistributionVisible,
        onDistributionVisibilityChanged = {
            viewModel.onEvent(
                CreatePollScreenEvent.OnDistributionVisibilityChanged(
                    it
                )
            )
        },
        onCreatePollClicked = {
            viewModel.onEvent(CreatePollScreenEvent.OnCreatePollClicked {
                Toast.makeText(context, successfulCreateText, Toast.LENGTH_SHORT).show()
            })
        },
        errorId = viewModel.screenState.inputValidationError,
        networkError = viewModel.error,
        onDismissErrorDialog = { viewModel.onEvent(CreatePollScreenEvent.OnErrorDismissed) },
        isDatePickerVisible = viewModel.screenState.isDatePickerVisible,
        onDatePickerVisibilityChanged = { viewModel.onEvent(CreatePollScreenEvent.ToggleDatePicker) },
        createdPollId = viewModel.screenState.createdPollId,
        searchedTag = viewModel.screenState.searchedTag,
        onSearchedTagChanged = { viewModel.onTagSearchTextChanged(it) },
        tags = viewModel.screenState.tags,
        insertTag = { id, tag -> viewModel.onTagInserted(id, tag)},
        onTagDismissRequest = { viewModel.clearCreatedPollId() },
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
    dueDate: String = "",
    onDueDateChanged: (String) -> Unit = {},
    lastAcceptValue: String = "",
    onLastAcceptValueChanged: (String) -> Unit = {},
    selectedLastAcceptValueType: CreatePollScreenState.AcceptValueType = CreatePollScreenState.AcceptValueType.DAY,
    onLastAcceptValueTypeChanged: (CreatePollScreenState.AcceptValueType) -> Unit = {},
    isDistributionVisible: Boolean = false,
    onDistributionVisibilityChanged: (Boolean) -> Unit = {},
    onCreatePollClicked: () -> Unit = {},
    errorId: Int? = null,
    networkError: String? = null,
    onDismissErrorDialog: () -> Unit = {},
    isDatePickerVisible: Boolean = false,
    onDatePickerVisibilityChanged: () -> Unit = {},
    createdPollId: Int = -1,
    searchedTag: String = "",
    onSearchedTagChanged: (String) -> Unit = {},
    tags: List<SemanticTag> = listOf(),
    insertTag: (Int, String) -> Unit = { _, _ -> },
    onTagDismissRequest: () -> Unit = {},
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(start = 16.dp, end = 16.dp)
            .verticalScroll(scrollState),
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
            dueDate = dueDate,
            onDueDateChanged = onDueDateChanged,
            toggleDatePicker = onDatePickerVisibilityChanged,
        )
        PollEndTime(
            lastAcceptValue = lastAcceptValue,
            onLastAcceptValueChanged = onLastAcceptValueChanged,
            onLastAcceptValueTypeChanged = onLastAcceptValueTypeChanged,
            selectedLastAcceptValueType = selectedLastAcceptValueType,
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
    ErrorDialog(
        error = errorId?.let { stringResource(id = it) } ?: networkError,
        onDismiss = { onDismissErrorDialog() }
    )
    CustomDatePicker(
        isDatePickerVisible = isDatePickerVisible,
        onDismissRequest = onDatePickerVisibilityChanged,
        onDateChanged = { onDueDateChanged(it) }
    )
    SemanticTagDialog(
        pollID = createdPollId,
        searchedTag = searchedTag,
        onSearchedTagChanged = onSearchedTagChanged,
        tags = tags,
        insertTag = insertTag,
        onDismissRequest = onTagDismissRequest,
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SemanticTagDialog(
    pollID: Int = -1,
    searchedTag: String = "",
    onSearchedTagChanged: (String) -> Unit = {},
    tags: List<SemanticTag> = listOf(),
    insertTag: (Int, String) -> Unit = { _, _ -> },
    onDismissRequest: () -> Unit = {},
) {
    if (pollID == -1)
        return

    AlertDialog(
        onDismissRequest = { onDismissRequest() },
        title = {
            Text(
                text = "Choose tags for your poll",
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column {
                Text(
                    text = "Please type your tag below to search for it.",
                    fontWeight = FontWeight.Medium,
                    fontSize = 14.sp,
                    lineHeight = 18.sp
                )
                Divider()
                Spacer(modifier = Modifier.height(8.dp))
                CustomInputField(
                    text = searchedTag,
                    onTextChanged = onSearchedTagChanged,
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Tags that match your search:",
                    fontWeight = FontWeight.Medium,
                    fontSize = 14.sp,
                    lineHeight = 18.sp
                )
                Divider()
                Spacer(modifier = Modifier.height(8.dp))
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(tags) {
                        Card(
                            onClick = {
                                insertTag(pollID, it.id)
                            },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(
                                modifier = Modifier.padding(8.dp)
                            ) {
                                Text(
                                    text = it.label,
                                    fontWeight = FontWeight.SemiBold,
                                    fontSize = 14.sp,
                                    lineHeight = 18.sp,
                                )
                                Text(
                                    text = it.description,
                                    fontWeight = FontWeight.Medium,
                                    fontSize = 12.sp,
                                    lineHeight = 16.sp,
                                )
                            }
                        }
                    }
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    onDismissRequest()
                }
            ) {
                Text(text = "Confirm")
            }
        },
    )
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
    toggleDatePicker: () -> Unit = {},
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
                onTrailingIconClicked = { toggleDatePicker() },
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
    selectedLastAcceptValueType: CreatePollScreenState.AcceptValueType,
    onLastAcceptValueTypeChanged: (CreatePollScreenState.AcceptValueType) -> Unit,
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = stringResource(id = R.string.poll_create_screen_poll_end),
            color = MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 14.sp,
            lineHeight = 17.sp,
            softWrap = true,
            overflow = TextOverflow.Visible,
            modifier = Modifier.width(IntrinsicSize.Max)
        )
        CustomInputField(
            modifier = Modifier.weight(1f),
            text = lastAcceptValue,
            onTextChanged = onLastAcceptValueChanged,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Number
            ),
        )
        LastAcceptValueTypeSelection(
            selectedItem = selectedLastAcceptValueType.type,
            onLastAcceptValueTypeChanged = onLastAcceptValueTypeChanged,
        )
    }
}

@OptIn(ExperimentalComposeUiApi::class)
@Composable
private fun LastAcceptValueTypeSelection(
    selectedItem: String,
    onLastAcceptValueTypeChanged: (CreatePollScreenState.AcceptValueType) -> Unit,
) {
    var expanded by remember { mutableStateOf(false) }
    val shape = RoundedCornerShape(8.dp)

    Column {
        Row(
            modifier = Modifier
                .background(MaterialTheme.colorScheme.primary, shape)
                .clip(shape = shape)
                .clickable {
                    expanded = expanded.not()
                }
                .padding(vertical = 12.dp, horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = selectedItem,
                color = MaterialTheme.colorScheme.onPrimary,
                style = MaterialTheme.typography.labelMedium,
                fontSize = 14.sp,
                lineHeight = 17.sp,
                textAlign = TextAlign.Center,
            )
            Icon(
                painter = painterResource(id = R.drawable.ic_back),
                contentDescription = stringResource(id = R.string.poll_create_screen_poll_end_selection),
                modifier = Modifier.rotate(-90f),
                tint = MaterialTheme.colorScheme.onPrimary,
            )
        }

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            properties = PopupProperties(
                usePlatformDefaultWidth = false,
            ),
            modifier = Modifier
                .background(MaterialTheme.colorScheme.primary)
        ) {
            CreatePollScreenState.AcceptValueType.entries.forEach { item ->
                DropdownMenuItem(
                    onClick = {
                        onLastAcceptValueTypeChanged(item)
                        expanded = false
                    },
                    text = {
                        Text(
                            text = item.type,
                            color = MaterialTheme.colorScheme.onPrimary,
                            style = MaterialTheme.typography.labelMedium,
                            fontSize = 14.sp,
                            lineHeight = 17.sp,
                            textAlign = TextAlign.Center,
                        )
                    }
                )
            }
        }
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