package com.bounswe.predictionpolls.ui.login

import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)

class LoginScreenViewModelTest {
    @Mock
    private lateinit var authRepository: AuthRepository

    @Test
    fun `test OnEmailChanged event`() {
        val viewModel = LoginScreenViewModel(authRepository)
        val newEmail = "abcdef"
        val event = LoginScreenEvent.OnEmailChanged(newEmail)
        assert(viewModel.screenState.email == "")
        viewModel.onEvent(event)
        assert(viewModel.screenState.email == newEmail)
    }

    @Test
    fun `test OnPasswordChanged event`() {
        val viewModel = LoginScreenViewModel(authRepository)
        val newPassword = "123456"
        val event = LoginScreenEvent.OnPasswordChanged(newPassword)
        assert(viewModel.screenState.password == "")
        viewModel.onEvent(event)
        assert(viewModel.screenState.password == newPassword)
    }

    @Test
    fun `test OnPasswordVisibilityToggleClicked event`() {
        val viewModel = LoginScreenViewModel(authRepository)
        val event = LoginScreenEvent.OnPasswordVisibilityToggleClicked
        assert(!viewModel.screenState.isPasswordVisible)
        viewModel.onEvent(event)
        assert(viewModel.screenState.isPasswordVisible)
    }

    @Test
    fun `test DismissErrorDialog event`() {
        val event = LoginScreenEvent.DismissErrorDialog
        val viewModel = LoginScreenViewModel(authRepository).apply {
            error = "error"
        }

        assert(viewModel.error == "error")
        viewModel.onEvent(event)
        assert(viewModel.error == null)
    }
}