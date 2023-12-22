package com.bounswe.predictionpolls.ui.moderation.vote

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val MODERATION_VOTE_ROUTE = "moderation_vote"

fun NavGraphBuilder.moderationVoteScreen(navController: NavController) {
    composable(MODERATION_VOTE_ROUTE) {
        ModerationVoteScreen(navController)
    }
}

fun NavController.navigateToModerationApplyScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(MODERATION_VOTE_ROUTE, navOptions, block)
}