package com.bounswe.predictionpolls.ui.common.poll

import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.domain.poll.ContinuousVoteInputType
import com.bounswe.predictionpolls.domain.poll.toKeyboardType
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

private val BackgroundShape = RoundedCornerShape(12.dp)

/**
 * Composable function that displays a continuous vote option.
 * @param title Title of the vote option.
 * @param vote Current vote value of the vote option.
 * @param isVotingEnabled Whether the user can vote or not.
 * @param voteType Input type of the vote option.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ContinuousVoteOption(
    title: String,
    vote: String,
    isVotingEnabled: Boolean,
    voteType: ContinuousVoteInputType,
    onVoteInputChanged: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    when (voteType) {
        ContinuousVoteInputType.Date -> {
            var showDatePickerDialog by rememberSaveable {
                mutableStateOf(false)
            }
            if (showDatePickerDialog) {
                DatePickerDialogComposable(
                    initialDate = vote,
                    onConfirm = onVoteInputChanged,
                    onDismiss = { showDatePickerDialog = false },
                    modifier = Modifier.requiredSize(getScreenSize())
                )
            }
            Column(modifier = modifier) {
                Text(text = title, fontFamily = MontserratFontFamily, fontSize = 16.sp)
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = vote,
                    fontFamily = MontserratFontFamily,
                    fontSize = 16.sp,
                    textAlign = TextAlign.Start,
                    modifier = Modifier
                        .aspectRatio(3f)
                        .border(
                            2.dp,
                            MaterialTheme.colorScheme.secondary,
                            BackgroundShape
                        )
                        .padding(16.dp)
                        .fillMaxWidth()
                        .clickable(isVotingEnabled) {
                            showDatePickerDialog = true
                        })

            }


        }

        else -> {
            val textFieldColors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = MaterialTheme.colorScheme.secondary,
                unfocusedBorderColor = MaterialTheme.colorScheme.secondary.copy(alpha = 0.8f),
                disabledBorderColor = MaterialTheme.colorScheme.secondary,
                errorBorderColor = MaterialTheme.colorScheme.error,
            )
            Column(modifier = modifier) {
                Text(text = title, fontFamily = MontserratFontFamily, fontSize = 16.sp)
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(
                    value = vote,
                    onValueChange = onVoteInputChanged,
                    textStyle = MaterialTheme.typography.bodyMedium.copy(
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Normal,
                    ),
                    enabled = isVotingEnabled,
                    shape = BackgroundShape,
                    colors = textFieldColors,
                    modifier = Modifier.fillMaxWidth(),
                    keyboardOptions = KeyboardOptions(keyboardType = voteType.toKeyboardType()),
                )
            }

        }
    }

}

@Composable
private fun getScreenSize(): DpSize {
    val configuration = LocalConfiguration.current
    return DpSize(width = configuration.screenWidthDp.dp, height = configuration.screenHeightDp.dp)
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun ContinuousVoteOptionPreview() {
    PredictionPollsTheme(dynamicColor = false) {
        var text by remember {
            mutableStateOf("")
        }
        Box(
            modifier = Modifier
                .fillMaxSize()
        ) {
            ContinuousVoteOption(
                vote = text,
                title = "Enter a date",
                voteType = ContinuousVoteInputType.Date,
                modifier = Modifier
                    .padding(16.dp)
                    .fillMaxWidth(0.5f),
                isVotingEnabled = true,
                onVoteInputChanged = { text = it }
            )
        }

    }
}