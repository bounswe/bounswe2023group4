package com.bounswe.predictionpolls.ui.moderation.vote

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun ModerationVoteScreen(
    navController: NavController
) {
    ModerationVoteScreenUI(
        tags = listOf("tag1", "tag2", "tag3"),
        title = "Question 1",
        choices = listOf("Choice 1", "Choice 2", "Choice 3")
    )
}

@Composable
private fun ModerationVoteScreenUI(
    tags: List<String> = emptyList(),
    title: String = "",
    choices: List<String> = emptyList(),
) {
    Column(
        modifier = Modifier
            .padding(horizontal = 12.dp, vertical = 16.dp)
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.25f),
                shape = MaterialTheme.shapes.medium
            )
            .padding(vertical = 32.dp, horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ){
            tags.forEach { tag ->
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
        Text(text = title)
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            choices.forEach {
                Text(text = it)
            }
        }
    }
}

@Preview
@Composable
private fun ModerationVoteScreenUIPreview() {
    ModerationVoteScreenUI()
}