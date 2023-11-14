package com.bounswe.predictionpolls.ui.login

sealed class LoginScreenEvent {
    data class OnEmailChanged(val email: String) : LoginScreenEvent()
    data object OnPasswordVisibilityToggleClicked : LoginScreenEvent()
    data class OnPasswordChanged(val password: String) : LoginScreenEvent()
    data class OnLoginButtonClicked(val onSuccess: () -> Unit) : LoginScreenEvent()
    data class OnGoogleTokenReceived(val token: String, val onSuccess: () -> Unit) : LoginScreenEvent()
    data object DismissErrorDialog : LoginScreenEvent()
}