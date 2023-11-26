package com.bounswe.predictionpolls.ui.leaderboard

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val LEADERBOARD_ROUTE = "leaderboard"

fun NavGraphBuilder.leaderboardScreen(navController: NavController) {
    composable(LEADERBOARD_ROUTE) {
        LeaderboardScreen(navController)
    }
}

fun NavController.navigateToLeaderboardScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(LEADERBOARD_ROUTE, navOptions, block)
}