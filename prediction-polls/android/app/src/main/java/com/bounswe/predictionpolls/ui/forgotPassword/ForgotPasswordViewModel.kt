package com.bounswe.predictionpolls.ui.forgotPassword

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.data.remote.repositories.RequestPasswordResetRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject


data class ForgotPasswordScreenState(
    val email: String = "",
    val emailError: String? = null,
    val isLoading: Boolean = false,
    val isSuccessful: Boolean = false
)

@HiltViewModel
class ForgotPasswordViewModel @Inject constructor(private val repository: RequestPasswordResetRepository) :
    ViewModel() {

    private val _screenState =
        MutableStateFlow(ForgotPasswordScreenState())
    val screenState = _screenState.asStateFlow()


    fun onEmailChanged(email: String) {
        _screenState.value = _screenState.value.copy(email = email)
    }

    fun onSendResetLinkPressed() {
        _screenState.value = _screenState.value.copy(isLoading = true)
        viewModelScope.launch(Dispatchers.IO) {
            try {
                repository.requestPasswordReset(_screenState.value.email)
                _screenState.value = _screenState.value.copy(isLoading = false, isSuccessful = true)
            } catch (e: Exception) {
                _screenState.value = _screenState.value.copy(
                    isLoading = false,
                    emailError = "An error occurred."
                )
                return@launch
            }

        }
    }

}