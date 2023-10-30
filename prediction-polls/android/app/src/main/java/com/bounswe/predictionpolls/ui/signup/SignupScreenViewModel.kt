package com.bounswe.predictionpolls.ui.signup

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.navigation.NavController
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import com.bounswe.predictionpolls.ui.feed.navigateToFeedScreen
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
            is SignupScreenEvent.OnSignupButtonClicked -> onSignupButtonClicked(event.navController)
            is SignupScreenEvent.OnSignupWithGoogleButtonClicked -> onSignupWithGoogleButtonClicked()
            is SignupScreenEvent.DismissErrorDialog -> onErrorDialogDismissed()
            else -> {}
        }
    }

    private fun onErrorDialogDismissed(){
        error = null
    }

    private fun onSignupButtonClicked(navController: NavController) {
        launchCatching(
            trackJobProgress = true,
            onSuccess = {
                navController.navigateToFeedScreen()
            },
            maxRetryCount = 1
        ) {
            authRepository.signup(
                email = screenState.email,
                username = screenState.username,
                password = screenState.password,
                birthday = screenState.birthday
            )
        }
    }

    private fun onSignupWithGoogleButtonClicked() {
        //TODO google sign in implementation
    }
}