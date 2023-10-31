package com.bounswe.predictionpolls.ui.signup

import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val SIGNUP_ROUTE = "signup"

fun NavGraphBuilder.signupScreen(navController: NavController) {
    composable(SIGNUP_ROUTE) {
        SignupScreen(navController)
    }
}

fun NavController.navigateToSignupScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(SIGNUP_ROUTE, navOptions, block)
}