package com.bounswe.predictionpolls.ui.feed

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.poll.PollOption
import com.bounswe.predictionpolls.ui.common.poll.ContinuousVoteOption
import com.bounswe.predictionpolls.ui.common.poll.DiscreteVoteOption
import com.bounswe.predictionpolls.ui.common.poll.PollComposable
import com.bounswe.predictionpolls.ui.common.poll.Polls
import kotlinx.collections.immutable.ImmutableList

@Composable
fun FeedScreen(feedUiState: FeedUiState, modifier: Modifier = Modifier) {
    var text by rememberSaveable { mutableStateOf("") } // this might be stored in VM. I am not sure how we will use this parameter so I will store it here for now..
    Column(modifier = modifier) {
        FeedSearchBar(text = text, onTextChanged = { text = it })
        when (feedUiState) {
            is FeedUiState.Loading -> {
                FeedLoading()
            }

            is FeedUiState.NoFeed -> {
                NoFeedDisplay()
            }

            is FeedUiState.HasFeed -> {
                Polls(polls = feedUiState.feed)
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
        Text(text = "No feed to show")
    }
}

@Composable
private fun FeedLoading(modifier: Modifier = Modifier) {
    Box(modifier) {
        CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
    }
}

