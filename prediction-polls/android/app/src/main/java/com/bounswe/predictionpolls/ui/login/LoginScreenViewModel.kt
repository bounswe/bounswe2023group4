package com.bounswe.predictionpolls.ui.login

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class LoginScreenViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : BaseViewModel() {
    var screenState by mutableStateOf(LoginScreenState())
        private set

    fun onEvent(event: LoginScreenEvent) {
        screenState = screenState.reduce(event)

        when (event) {
            is LoginScreenEvent.OnLoginButtonClicked -> onLoginButtonClicked(event.onSuccess)
            is LoginScreenEvent.OnGoogleTokenReceived -> onGoogleTokenReceived(event.token, event.onSuccess)
            is LoginScreenEvent.DismissErrorDialog -> onErrorDialogDismissed()
            else -> {}
        }
    }

    private fun onErrorDialogDismissed(){
        error = null
    }

    private fun isFormValid(): Boolean {
        if (screenState.isEmailValid.not()) {
            screenState = screenState.copy(showEmailError = true)
            return false
        }

        return true
    }

    private fun onLoginButtonClicked(onSuccess: () -> Unit) {
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
            authRepository.login(
                username = screenState.email,
                password = screenState.password,
            )
        }
    }

    private fun onGoogleTokenReceived(
        googleToken: String,
        onSuccess: () -> Unit
    ) {
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
            authRepository.loginWithGoogle(googleToken)
        }
    }
}