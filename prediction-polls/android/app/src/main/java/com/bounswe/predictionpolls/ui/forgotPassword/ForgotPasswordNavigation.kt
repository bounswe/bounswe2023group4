package com.bounswe.predictionpolls.ui.forgotPassword


import android.widget.Toast
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val FORGOT_PASSWORD_ROUTE = "forgot_password_route"

fun NavGraphBuilder.forgotPasswordScreen(navController: NavController) {
    composable(FORGOT_PASSWORD_ROUTE) {
        val viewModel: ForgotPasswordViewModel = hiltViewModel()
        val state by viewModel.screenState.collectAsStateWithLifecycle()
        val context = LocalContext.current
        Box(modifier = Modifier.fillMaxSize()) {
            LaunchedEffect(state.isSuccessful) {
                if (state.isSuccessful.not()) return@LaunchedEffect
                Toast
                    .makeText(
                        context,
                        "Reset link is sent if email registered.",
                        Toast.LENGTH_SHORT
                    )
                    .show()
                navController.popBackStack()
            }

            LaunchedEffect(state.emailError) {
                state.emailError?.let {
                    Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
                }
            }

            ForgotPasswordScreen(
                email = state.email,
                onEmailChanged = viewModel::onEmailChanged,
                onSendResetLinkPressed = viewModel::onSendResetLinkPressed,
                onBackToLoginPressed = navController::popBackStack
            )

            if (state.isLoading) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
            }
        }


    }
}

fun NavController.navigateToForgotPasswordRoute(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(FORGOT_PASSWORD_ROUTE, navOptions, block)
}