package com.bounswe.predictionpolls.ui.signup

import com.bounswe.predictionpolls.extensions.isValidDate
import com.bounswe.predictionpolls.extensions.isValidEmail

data class SignupScreenState(
    val email: String = "",
    val username: String = "",
    val password: String = "",
    val isPasswordVisible: Boolean = false,
    val birthday: String = "",
    val isDatePickerVisible: Boolean = false,
    val isAgreementChecked: Boolean = false,
    val showEmailError: Boolean = false,
    val showPasswordError: Boolean = false,
    val showBirthdayError: Boolean = false,
) {
    companion object {
        const val MIN_PASSWORD_LENGTH = 8
        const val MAX_BIRTHDAY_LENGTH = 8
    }

    val isEmailValid: Boolean
        get() = email.isValidEmail()
    val shouldShowEmailError: Boolean
        get() = showEmailError && email.isBlank().not() && isEmailValid.not()

    val isPasswordValid: Boolean
        get() =  password.any { it.isLowerCase() } && password.any { it.isUpperCase() }
                && password.any { it.isDigit() } && password.any { it.isLetterOrDigit().not() }
                && password.length >= MIN_PASSWORD_LENGTH

    val shouldShowPasswordError: Boolean
        get() = showPasswordError && password.isBlank().not() && isPasswordValid.not()

    val isBirthdayValid: Boolean
        get() = birthday.none { it.isDigit().not() } && birthday.isValidDate()

    val shouldShowBirthdayError: Boolean
        get() = showBirthdayError && birthday.isBlank().not() && isBirthdayValid.not()

    val isSignupButtonEnabled: Boolean
        get() = email.isNotBlank() &&
                username.isNotBlank() &&
                password.isNotBlank() &&
                birthday.isNotBlank() &&
                isAgreementChecked

    fun reduce(event: SignupScreenEvent): SignupScreenState {
        return when (event) {
            is SignupScreenEvent.OnEmailChanged -> copy(email = event.email, showEmailError = false)
            is SignupScreenEvent.OnUsernameChanged -> copy(username = event.username)
            is SignupScreenEvent.OnPasswordChanged -> copy(password = event.password, showPasswordError = false)
            is SignupScreenEvent.OnPasswordVisibilityToggleClicked -> copy(isPasswordVisible = !isPasswordVisible)
            is SignupScreenEvent.OnBirthdayChanged -> copy(birthday = event.birthday.take(MAX_BIRTHDAY_LENGTH), showBirthdayError = false)
            is SignupScreenEvent.OnAgreementChecked -> copy(isAgreementChecked = !isAgreementChecked)
            is SignupScreenEvent.OnDatePickerClicked -> copy(isDatePickerVisible = !isDatePickerVisible)
            else -> this
        }
    }
}
