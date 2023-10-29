package com.bounswe.predictionpolls.ui.main

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val MAIN_ROUTE = "home"

fun NavGraphBuilder.mainScreen(navController: NavController) {
    composable(MAIN_ROUTE) {
        MainScreen(navController = navController)
    }
}

fun NavController.navigateToMainScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(MAIN_ROUTE, navOptions, block)
}