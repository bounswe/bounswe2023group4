package com.bounswe.predictionpolls.ui.login

sealed class LoginScreenEvent {
    data class OnEmailChanged(val email: String) : LoginScreenEvent()
    data object OnPasswordVisibilityToggleClicked : LoginScreenEvent()
    data class OnPasswordChanged(val password: String) : LoginScreenEvent()
    data object OnLoginButtonClicked : LoginScreenEvent()
    data object OnLoginWithGoogleButtonClicked : LoginScreenEvent()
}