package com.bounswe.predictionpolls.ui.login

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import com.bounswe.predictionpolls.extensions.isValidEmail
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
            is LoginScreenEvent.OnLoginWithGoogleButtonClicked -> onLoginWithGoogleButtonClicked()
            is LoginScreenEvent.DismissErrorDialog -> onErrorDialogDismissed()
            else -> {}
        }
    }

    private fun onErrorDialogDismissed(){
        error = null
    }


    // TODO handle form validation better
    private fun isFormValid(): Boolean {
        if (screenState.email.isValidEmail().not()) {
            error = "Please enter a valid email address."
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
            maxRetryCount = 1
        ) {
            authRepository.login(
                username = screenState.email,
                password = screenState.password,
            )
        }
    }

    private fun onLoginWithGoogleButtonClicked() {
        //TODO google sign in implementation
        error = "Login with Google is not implemented yet."
    }
}