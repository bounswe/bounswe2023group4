package com.bounswe.predictionpolls.ui.signup

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
class SignupScreenViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {
    var screenState by mutableStateOf(SignupScreenState())
        private set

    fun onEvent(event: SignupScreenEvent){
        screenState = screenState.reduce(event)

        when(event){
            is SignupScreenEvent.OnSignupButtonClicked -> onSignupButtonClicked()
            is SignupScreenEvent.OnSignupWithGoogleButtonClicked -> onSignupWithGoogleButtonClicked()
            else -> {}
        }
    }

    private fun onSignupButtonClicked(){
        viewModelScope.launch {
            authRepository.signup(
                username = screenState.username,
                password = screenState.password,
            )
        }
    }

    private fun onSignupWithGoogleButtonClicked(){
        //TODO google sign in implementation
    }
}