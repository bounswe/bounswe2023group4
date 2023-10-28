package com.bounswe.predictionpolls.ui.login

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.launch

@HiltViewModel
class LoginScreenViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {
    var screenState by mutableStateOf(LoginScreenState())
        private set

    fun onEvent(event: LoginScreenEvent) {
        screenState = screenState.reduce(event)

        when (event) {
            is LoginScreenEvent.OnLoginButtonClicked -> onLoginButtonClicked()
            is LoginScreenEvent.OnLoginWithGoogleButtonClicked -> onLoginWithGoogleButtonClicked()
            else -> {}
        }
    }

    private fun onLoginButtonClicked() {
        viewModelScope.launch {
            authRepository.login(
                username = screenState.email,
                password = screenState.password,
            )
        }
    }

    private fun onLoginWithGoogleButtonClicked() {
        //TODO google sign in implementation
    }
}