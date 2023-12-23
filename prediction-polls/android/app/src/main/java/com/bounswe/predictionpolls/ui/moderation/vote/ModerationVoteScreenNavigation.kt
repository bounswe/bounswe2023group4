package com.bounswe.predictionpolls.ui.moderation.vote

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.NavType
import androidx.navigation.Navigator
import androidx.navigation.compose.composable
import androidx.navigation.navArgument

const val MODERATION_VOTE_ROUTE = "moderation_vote"
fun NavGraphBuilder.moderationVoteScreen(navController: NavController) {
    composable(
        "$MODERATION_VOTE_ROUTE/{requestId}",
        arguments = listOf(
            navArgument("requestId"){
                type = NavType.IntType
            }
        )
    ) {
        ModerationVoteScreen(navController)
    }
}

fun NavController.navigateToModerationApplyScreen(
    requestId: Int,
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate("$MODERATION_VOTE_ROUTE/$requestId", navOptions, block)
}