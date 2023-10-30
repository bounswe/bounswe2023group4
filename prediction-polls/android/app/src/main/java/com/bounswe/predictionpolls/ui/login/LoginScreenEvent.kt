package com.bounswe.predictionpolls.ui.login

import androidx.navigation.NavController

sealed class LoginScreenEvent {
    data class OnEmailChanged(val email: String) : LoginScreenEvent()
    data object OnPasswordVisibilityToggleClicked : LoginScreenEvent()
    data class OnPasswordChanged(val password: String) : LoginScreenEvent()
    data class OnLoginButtonClicked(val navController: NavController) : LoginScreenEvent()
    data class OnLoginWithGoogleButtonClicked(val navController: NavController) : LoginScreenEvent()
    data object DismissErrorDialog : LoginScreenEvent()
}