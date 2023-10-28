package com.bounswe.predictionpolls.ui.signup

import androidx.navigation.NavController

sealed class SignupScreenEvent {
    data class OnEmailChanged(val email: String) : SignupScreenEvent()
    data class OnUsernameChanged(val username: String) : SignupScreenEvent()
    data class OnPasswordChanged(val password: String) : SignupScreenEvent()
    data object OnPasswordVisibilityToggleClicked : SignupScreenEvent()
    data class OnBirthdayChanged(val birthday: String) : SignupScreenEvent()
    data object OnDatePickerClicked : SignupScreenEvent()
    data object OnAgreementChecked : SignupScreenEvent()
    data class OnSignupButtonClicked(val navController: NavController) : SignupScreenEvent()
    data class OnSignupWithGoogleButtonClicked(val navController: NavController) :
        SignupScreenEvent()
}