package com.bounswe.predictionpolls.ui.feed

import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val FEED_ROUTE = "feed"

fun NavGraphBuilder.feedScreen(navController: NavController) {
    composable(FEED_ROUTE) {
        val feedViewModel: FeedViewModel = hiltViewModel() // will be used later
        FeedScreen()
    }
}

fun NavController.navigateToFeedScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(FEED_ROUTE, navOptions, block)
}