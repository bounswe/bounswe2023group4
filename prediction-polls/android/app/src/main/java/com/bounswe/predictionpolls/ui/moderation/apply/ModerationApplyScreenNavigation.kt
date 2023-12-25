package com.bounswe.predictionpolls.ui.moderation.apply

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val MODERATION_APPLY_ROUTE = "moderation_apply"

fun NavGraphBuilder.moderationApplyScreen(navController: NavController) {
    composable(MODERATION_APPLY_ROUTE) {
        ModerationApplyScreen(navController)
    }
}

fun NavController.navigateToModerationApplyScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(MODERATION_APPLY_ROUTE, navOptions, block)
}