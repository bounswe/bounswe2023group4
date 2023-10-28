package com.bounswe.predictionpolls.ui.signup

data class SignupScreenState(
    val email: String = "",
    val username: String = "",
    val password: String = "",
    val isPasswordVisible: Boolean = false,
    val birthday: String = "",
    val isDatePickerVisible: Boolean = false,
    val isAgreementChecked: Boolean = false,
) {
    val isSignupButtonEnabled: Boolean
        get() = email.isNotBlank() &&
                username.isNotBlank() &&
                password.isNotBlank() &&
                birthday.isNotBlank() &&
                birthday.none { it.isDigit().not() } &&
                isAgreementChecked

    fun reduce(event: SignupScreenEvent): SignupScreenState {
        return when (event) {
            is SignupScreenEvent.OnEmailChanged -> copy(email = event.email)
            is SignupScreenEvent.OnUsernameChanged -> copy(username = event.username)
            is SignupScreenEvent.OnPasswordChanged -> copy(password = event.password)
            is SignupScreenEvent.OnPasswordVisibilityToggleClicked -> copy(isPasswordVisible = !isPasswordVisible)
            is SignupScreenEvent.OnBirthdayChanged -> copy(birthday = event.birthday)
            is SignupScreenEvent.OnAgreementChecked -> copy(isAgreementChecked = !isAgreementChecked)
            is SignupScreenEvent.OnDatePickerClicked -> copy(isDatePickerVisible = !isDatePickerVisible)
            else -> this
        }
    }
}
