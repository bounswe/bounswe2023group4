package com.bounswe.predictionpolls.ui.login

data class LoginScreenState(
    val email: String = "",
    val password: String = "",
    val isPasswordVisible: Boolean = false
) {
    val isLoginButtonEnabled: Boolean
        get() = email.isNotBlank() &&
                password.isNotBlank()

    fun reduce(event: LoginScreenEvent): LoginScreenState {
        return when (event) {
            is LoginScreenEvent.OnEmailChanged -> copy(email = event.email)
            is LoginScreenEvent.OnPasswordChanged -> copy(password = event.password)
            is LoginScreenEvent.OnPasswordVisibilityToggleClicked -> copy(isPasswordVisible = !isPasswordVisible)
            else -> this
        }
    }
}