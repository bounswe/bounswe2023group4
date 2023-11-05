package com.bounswe.predictionpolls.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun ErrorDialog(
    error: String? = null,
    onDismiss: () -> Unit = {}
) {
    if (error == null) return
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = stringResource(id = R.string.error_dialog_title),
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Text(text = error)
        },
        confirmButton = {
            TextButton(
                onClick = {
                    onDismiss()
                }
            ) {
                Text(stringResource(id = R.string.ok))
            }
        },
    )
}

@Preview
@Composable
fun ErrorDialogPreview() {
    PredictionPollsTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
        )
        ErrorDialog(
            error = "An unexpected error occurred. Please try again later."
        )
    }
}