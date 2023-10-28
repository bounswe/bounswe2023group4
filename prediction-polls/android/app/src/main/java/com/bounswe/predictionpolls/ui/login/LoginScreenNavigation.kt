package com.bounswe.predictionpolls.ui.login

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val LOGIN_ROUTE = "login"

fun NavGraphBuilder.loginScreen() {
    composable(LOGIN_ROUTE) {
        LoginScreen()
    }
}

fun NavController.navigateToLoginScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(LOGIN_ROUTE, navOptions, block)
}