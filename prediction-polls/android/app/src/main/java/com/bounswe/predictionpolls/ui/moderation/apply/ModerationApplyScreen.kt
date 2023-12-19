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
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.bounswe.predictionpolls.ui.moderation.list.navigateToModerationScreen
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun ModerationApplyScreen(
    navController: NavController
) {
    ModerationApplyScreenUI(
        navigateToModerationScreen = {
            navController.navigateToModerationScreen()
        },
        onBackClick = {
            navController.popBackStack()
        }
    )
}

@Composable
private fun ModerationApplyScreenUI(
    navigateToModerationScreen: () -> Unit = {},
    onBackClick: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 12.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
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
                text = "Moderation request is now open. Would you like to apply to become a moderator?",
                textAlign = TextAlign.Center,
            )
        }
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Button(
                onClick = {
                    navigateToModerationScreen()
                }
            ) {
                Text(text = "Apply")
            }
            Button(
                onClick = {
                    onBackClick()
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.error
                )
            ) {
                Text(text = "Cancel")
            }
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


