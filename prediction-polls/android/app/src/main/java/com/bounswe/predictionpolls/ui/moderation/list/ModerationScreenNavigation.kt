package com.bounswe.predictionpolls.ui.moderation.list

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val MODERATION_ROUTE = "moderation"

fun NavGraphBuilder.moderationScreen(navController: NavController) {
    composable(MODERATION_ROUTE) {
        ModerationScreen(navController)
    }
}

fun NavController.navigateToModerationScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(MODERATION_ROUTE, navOptions, block)
}