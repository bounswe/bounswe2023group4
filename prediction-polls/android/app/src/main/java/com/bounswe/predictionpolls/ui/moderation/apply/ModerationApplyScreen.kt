package com.bounswe.predictionpolls.ui.moderation.apply

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.moderation.list.navigateToModerationScreen
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun ModerationApplyScreen(
    navController: NavController,
    viewModel: ModerationApplyViewModel = hiltViewModel()
) {
    LaunchedEffect(viewModel.screenState.isModerator){
        if(viewModel.screenState.isModerator){
            navController.navigateToModerationScreen()
        }
    }

    ModerationApplyScreenUI(
        isApplied = viewModel.screenState.isApplied,
        onApplyClick = {
            viewModel.onEvent(ModerationApplyScreenEvent.ApplyToModeration)
        },
        onCheckCurrentStatus = {
            viewModel.onEvent(ModerationApplyScreenEvent.CheckCurrentStatus)
        },
        onBackClick = {
            navController.popBackStack()
        }
    )
}

@Composable
private fun ModerationApplyScreenUI(
    isApplied: Boolean = false,
    onApplyClick: () -> Unit = {},
    onCheckCurrentStatus: () -> Unit = {},
    onBackClick: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 12.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        when {
            isApplied -> {
                ModeratorCheckStatusUI(
                    onCheckCurrentStatus = onCheckCurrentStatus,
                    onBackClick = onBackClick
                )
            }
            else -> {
                ModeratorApplyUI(
                    onApplyClick = onApplyClick,
                    onBackClick = onBackClick
                )
            }
        }
    }
}

@Composable
private fun ModeratorApplyUI(
    onApplyClick: () -> Unit = {},
    onBackClick: () -> Unit = {}
) {
    InfoBox(infoText = stringResource(R.string.moderator_apply_text))
    ActionButtons(
        onLeadingClick = onApplyClick,
        leadingText = stringResource(R.string.apply),
        onTrailingClick = onBackClick,
        trailingText = stringResource(R.string.cancel)
    )
}

@Composable
private fun ModeratorCheckStatusUI(
    onCheckCurrentStatus: () -> Unit = {},
    onBackClick: () -> Unit = {}
) {
    InfoBox(infoText = stringResource(R.string.moderator_check_status))
    ActionButtons(
        onLeadingClick = onCheckCurrentStatus,
        leadingText = stringResource(R.string.moderator_check_status_button),
        onTrailingClick = onBackClick,
        trailingText = stringResource(R.string.back)
    )
}

@Composable
private fun InfoBox(
    infoText: String
) {
    Box(
        modifier = Modifier
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.25f),
                shape = MaterialTheme.shapes.medium
            )
            .padding(horizontal = 16.dp, vertical = 32.dp)
    ) {
        Text(
            text = infoText,
            textAlign = TextAlign.Center,
        )
    }
}

@Composable
private fun ActionButtons(
    onLeadingClick: () -> Unit = {},
    leadingText: String,
    onTrailingClick: () -> Unit = {},
    trailingText: String
){
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Button(
            onClick = {
                onLeadingClick()
            }
        ) {
            Text(text = leadingText)
        }
        Button(
            onClick = {
                onTrailingClick()
            },
            colors = ButtonDefaults.buttonColors(
                containerColor = MaterialTheme.colorScheme.error
            )
        ) {
            Text(text = trailingText)
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun ModerationApplyScreenUIPreview() {
    PredictionPollsTheme {
        ModerationApplyScreenUI()
    }
}


