package com.bounswe.predictionpolls.ui.signup

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class SignupScreenViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : BaseViewModel() {
    var screenState by mutableStateOf(SignupScreenState())
        private set

    fun onEvent(event: SignupScreenEvent) {
        screenState = screenState.reduce(event)

        when (event) {
            is SignupScreenEvent.OnSignupButtonClicked -> onSignupButtonClicked(event.onSuccess)
            is SignupScreenEvent.DismissErrorDialog -> onErrorDialogDismissed()
            else -> {}
        }
    }

    private fun onErrorDialogDismissed(){
        error = null
    }

    private fun isFormValid(): Boolean {
        val isEmailValid = screenState.isEmailValid
        val isPasswordValid = screenState.isPasswordValid
        val isBirthdayValid = screenState.isBirthdayValid

        screenState = screenState.copy(
            showEmailError = isEmailValid.not(),
            showPasswordError = isPasswordValid.not(),
            showBirthdayError = isBirthdayValid.not()
        )

        return isEmailValid && isPasswordValid && isBirthdayValid
    }

    private fun onSignupButtonClicked(onSuccess: () -> Unit) {
        if(isFormValid().not()) return

        launchCatching(
            trackJobProgress = true,
            onSuccess = {
                onSuccess()
            },
            onError = {
                error = it?.message
            },
            maxRetryCount = 1
        ) {
            val givenBirthday = screenState.birthday
            val formattedBirthday = "${givenBirthday.substring(0, 2)}/${givenBirthday.substring(2, 4)}/${givenBirthday.substring(4, 8)}"

            authRepository.signup(
                email = screenState.email,
                username = screenState.username,
                password = screenState.password,
                birthday = formattedBirthday
            )
        }
    }
}