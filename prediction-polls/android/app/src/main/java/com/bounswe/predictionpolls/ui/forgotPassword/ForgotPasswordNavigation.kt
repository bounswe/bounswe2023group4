package com.bounswe.predictionpolls.ui.forgotPassword


import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val FORGOT_PASSWORD_ROUTE = "forgot_password_route"

fun NavGraphBuilder.forgotPasswordScreen(navController: NavController) {
    composable(FORGOT_PASSWORD_ROUTE) {
        ForgotPasswordScreen(
            email = "",
            onEmailChanged = {},
            onSendResetLinkPressed = { /*TODO*/ },
            onBackToLoginPressed = { /*TODO*/ })

    }
}

fun NavController.navigateToForgotPasswordRoute(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(FORGOT_PASSWORD_ROUTE, navOptions, block)
}