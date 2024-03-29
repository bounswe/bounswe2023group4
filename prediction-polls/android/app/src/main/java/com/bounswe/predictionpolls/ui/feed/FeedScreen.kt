package com.bounswe.predictionpolls.ui.feed

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.bounswe.predictionpolls.ui.common.poll.Polls

@Composable
fun FeedScreen(
    feedUiState: FeedUiState,
    searchedTag: String,
    onTagSearchTextChanged: (String) -> Unit,
    onProfileClicked: (userName: String) -> Unit,
    onPollClicked: (pollId: String) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        FeedSearchBar(
            modifier = Modifier.fillMaxWidth(),
            text = searchedTag,
            onTextChanged = onTagSearchTextChanged
        )
        Spacer(modifier = Modifier.height(16.dp))
        when (feedUiState) {
            is FeedUiState.Loading -> {
                FeedLoading()
            }

            is FeedUiState.NoFeed -> {
                NoFeedDisplay(
                    modifier = Modifier
                        .fillMaxSize()
                )
            }

            is FeedUiState.HasFeed -> {
                Polls(polls = feedUiState.feed, onPollClicked = onPollClicked, onProfileClicked = onProfileClicked)
            }

            is FeedUiState.Error -> {
                FeedError(errorMessage = feedUiState.message)
            }
        }


    }

}

@Composable
private fun FeedError(errorMessage: String, modifier: Modifier = Modifier) {
    Box(modifier = modifier) {
        Text(text = errorMessage, modifier = Modifier.align(Alignment.Center))
    }
}

@Composable
private fun NoFeedDisplay(modifier: Modifier = Modifier) {
    Box(modifier = modifier) {
        Text(text = "No feed to show", modifier = Modifier.align(Alignment.Center))
    }
}

@Composable
private fun FeedLoading(modifier: Modifier = Modifier) {
    Box(modifier) {
        CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
    }
}

