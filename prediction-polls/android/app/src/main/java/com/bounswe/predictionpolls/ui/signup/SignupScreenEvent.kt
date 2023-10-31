package com.bounswe.predictionpolls.ui.signup

sealed class SignupScreenEvent {
    data class OnEmailChanged(val email: String) : SignupScreenEvent()
    data class OnUsernameChanged(val username: String) : SignupScreenEvent()
    data class OnPasswordChanged(val password: String) : SignupScreenEvent()
    data object OnPasswordVisibilityToggleClicked : SignupScreenEvent()
    data class OnBirthdayChanged(val birthday: String) : SignupScreenEvent()
    data object OnDatePickerClicked : SignupScreenEvent()
    data object OnAgreementChecked : SignupScreenEvent()
    data class OnSignupButtonClicked(val onSuccess: () -> Unit) : SignupScreenEvent()
    data class OnSignupWithGoogleButtonClicked(val onSuccess: () -> Unit) :
        SignupScreenEvent()

    data object DismissErrorDialog : SignupScreenEvent()
}