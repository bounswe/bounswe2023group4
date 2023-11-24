package com.bounswe.predictionpolls.ui.common

import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.intl.Locale
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.extensions.toTimeDateString

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomDatePicker(
    isDatePickerVisible: Boolean = false,
    onDismissRequest: () -> Unit = {},
    onDateChanged: (String) -> Unit = {},
) {
    if (isDatePickerVisible.not()) return

    val locale = Locale.current
    val datePickerState = rememberDatePickerState()
    val confirmEnabled = remember {
        derivedStateOf { datePickerState.selectedDateMillis != null }
    }

    DatePickerDialog(
        onDismissRequest = onDismissRequest,
        confirmButton = {
            TextButton(
                onClick = {
                    datePickerState.selectedDateMillis?.let {
                        onDateChanged(it.toTimeDateString(locale))
                    }
                    onDismissRequest()
                },
                enabled = confirmEnabled.value
            ) {
                Text(
                    text = stringResource(id = R.string.confirm),
                )
            }
        },
        dismissButton = {
            TextButton(
                onClick = {
                    onDismissRequest()
                }
            ) {
                Text(
                    text = stringResource(id = R.string.cancel),
                )
            }
        },
    ) {
        DatePicker(state = datePickerState)
    }
}