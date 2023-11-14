package com.bounswe.predictionpolls.ui.common.poll

import android.icu.text.SimpleDateFormat
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import java.util.Date
import java.util.Locale

/**
 * Composable function that displays a date picker dialog.
 * @param onConfirm Callback function that is called when the user confirms the date. Date format is dd/MM/yyyy. If no date is chosen "" is returned.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DatePickerDialogComposable(
    initialDate: String,
    onConfirm: (String) -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    val datePickerState =
        rememberDatePickerState(initialSelectedDateMillis = convertDateToMillis(initialDate))

    DatePickerDialog(
        modifier = modifier,
        onDismissRequest = onDismiss,
        confirmButton = {
            Button(onClick = {
                onConfirm(datePickerState.selectedDateMillis?.let { convertMillisToDate(it) } ?: "")
                onDismiss()
            }
            ) {
                Text(text = stringResource(id = R.string.date_picker_ok))
            }
        },
        dismissButton = {
            Button(onClick = {
                onDismiss()
            }) {
                Text(text = stringResource(R.string.date_picker_cancel))
            }
        },
        content = {
            DatePicker(state = datePickerState)
        },
    )


}

private fun convertMillisToDate(millis: Long): String {
    val formatter = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
    return formatter.format(Date(millis))
}


private fun convertDateToMillis(dateStr: String): Long? {
    val formatter = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
    return try {
        val date = formatter.parse(dateStr)
        date?.time
    } catch (e: Exception) {
        null
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
fun DatePickerDialogComposablePreview() {
    PredictionPollsTheme(dynamicColor = false) {
        Box(Modifier.fillMaxSize()) {
            DatePickerDialogComposable(
                initialDate = "02/01/2021",
                onConfirm = {},
                onDismiss = {},
                modifier = Modifier.align(Alignment.Center)
            )

        }
    }
}
