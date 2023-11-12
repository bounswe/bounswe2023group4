package com.bounswe.predictionpolls.ui.login

import com.bounswe.predictionpolls.extensions.isValidEmail

data class LoginScreenState(
    val email: String = "",
    val password: String = "",
    val isPasswordVisible: Boolean = false,
    val showEmailError: Boolean = false,
) {
    val isEmailValid: Boolean
        get() = email.isValidEmail()

    val shouldShowEmailError: Boolean
        get() = showEmailError && email.isBlank().not() && isEmailValid.not()

    val isLoginButtonEnabled: Boolean
        get() = email.isNotBlank() &&
                password.isNotBlank()

    fun reduce(event: LoginScreenEvent): LoginScreenState {
        return when (event) {
            is LoginScreenEvent.OnEmailChanged -> copy(email = event.email, showEmailError = false)
            is LoginScreenEvent.OnPasswordChanged -> copy(password = event.password)
            is LoginScreenEvent.OnPasswordVisibilityToggleClicked -> copy(isPasswordVisible = !isPasswordVisible)
            else -> this
        }
    }
}