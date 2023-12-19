package com.bounswe.predictionpolls.ui.moderation.list

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController

@Composable
fun ModerationScreen(
    navController: NavController,
    viewModel: ModerationScreenViewModel = hiltViewModel()
) {
    ModerationScreenUI(
        tags = viewModel.screenState.tags,
        requestedPolls = viewModel.screenState.requestedPolls
    )
}

@Composable
private fun ModerationScreenUI(
    tags: List<String> = listOf(),
    requestedPolls: List<ModerationScreenState.RequestedPoll> = listOf()
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 12.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items (requestedPolls) { requestedPoll ->
            RequestedPoll(requestedPoll = requestedPoll)
        }
    }
}

@Composable
private fun RequestedPoll(
    requestedPoll: ModerationScreenState.RequestedPoll
) {
    Column(
        modifier = Modifier
            .border(1.dp, Color.Black, RoundedCornerShape(8.dp))
            .padding(vertical = 16.dp, horizontal = 12.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        when (requestedPoll.type) {
            ModerationScreenState.RequestedPollType.REPORT -> Text(
                text = "Would you like to be on the jury to resolve a report about following poll?",
                textAlign = TextAlign.Center
            )
            ModerationScreenState.RequestedPollType.END -> Text(
                text = "Would you like to be on the jury to end the following poll?",
                textAlign = TextAlign.Center
            )
        }
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ){
            requestedPoll.tags.forEach { tag ->
                Box(
                    modifier = Modifier
                        .background(MaterialTheme.colorScheme.secondary, RoundedCornerShape(8.dp))
                        .padding(vertical = 8.dp, horizontal = 12.dp)
                ) {
                    Text(text = tag, color = Color.White)
                }
            }
            Spacer(modifier = Modifier.weight(1f))
        }
        Text(text = requestedPoll.question, textAlign = TextAlign.Center)
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Button(
                onClick = {
                }
            ) {
                Text(text = "Accept")
            }
            Button(
                onClick = {
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.error
                )
            ) {
                Text(text = "Decline")
            }
        }
    }
}