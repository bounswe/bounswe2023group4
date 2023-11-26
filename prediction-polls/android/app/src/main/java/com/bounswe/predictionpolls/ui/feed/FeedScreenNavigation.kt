package com.bounswe.predictionpolls.ui.feed

import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable
import com.bounswe.predictionpolls.ui.vote.navigateToPollVoteScreen

const val FEED_ROUTE = "feed"

fun NavGraphBuilder.feedScreen(navController: NavController) {
    composable(FEED_ROUTE) {
        val feedViewModel: FeedViewModel = hiltViewModel()
        LaunchedEffect(Unit) {
            // fetch the feed if it is not already fetched
            if (feedViewModel.feedUiState.value !is FeedUiState.HasFeed)
                feedViewModel.fetchFeed(0)
        }
        val feedUiState by feedViewModel.feedUiState.collectAsStateWithLifecycle()
        FeedScreen(feedUiState, onPollClicked = {
            navController.navigateToPollVoteScreen(it)
        })
    }
}

fun NavController.navigateToFeedScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(FEED_ROUTE, navOptions, block)
}