package com.bounswe.predictionpolls.ui.create

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val CREATE_POLL_ROUTE = "create_poll"

fun NavGraphBuilder.createPollScreen() {
    composable(CREATE_POLL_ROUTE) {
        CreatePollScreen()
    }
}

fun NavController.navigateToCreatePollScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(CREATE_POLL_ROUTE, navOptions, block)
}

