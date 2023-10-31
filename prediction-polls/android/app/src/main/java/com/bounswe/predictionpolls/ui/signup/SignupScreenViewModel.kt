package com.bounswe.predictionpolls.ui.signup

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.navigation.NavController
import androidx.navigation.NavOptions
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import com.bounswe.predictionpolls.extensions.isValidDate
import com.bounswe.predictionpolls.extensions.isValidEmail
import com.bounswe.predictionpolls.ui.feed.navigateToFeedScreen
import com.bounswe.predictionpolls.ui.main.MAIN_ROUTE
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

    // TODO handle form validation better
    private fun isFormValid(): Boolean {
        if (screenState.email.isValidEmail().not()) {
            error = "Please enter a valid email address."
            return false
        } else if(screenState.birthday.isValidDate().not()){
            error = "Please enter a valid birthday."
            return false
        }

        return true
    }

    private fun onSignupButtonClicked(navController: NavController) {
        if(isFormValid().not()) return

        launchCatching(
            trackJobProgress = true,
            onSuccess = {
                navController.navigateToFeedScreen(
                    navOptions = NavOptions
                        .Builder()
                        .setPopUpTo(MAIN_ROUTE, true)
                        .build()
                )
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
        error = "Sign up with Google is not implemented yet."
    }
}