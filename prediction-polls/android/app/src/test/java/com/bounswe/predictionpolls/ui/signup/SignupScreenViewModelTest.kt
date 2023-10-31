package com.bounswe.predictionpolls.ui.signup

import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class SignupScreenViewModelTest {
    @Mock
    private lateinit var authRepository: AuthRepository

    @Test
    fun `test OnEmailChanged event`() {
        val viewModel = SignupScreenViewModel(authRepository)
        val newEmail = "a@b.com"
        val event = SignupScreenEvent.OnEmailChanged(newEmail)
        assert(viewModel.screenState.email == "")
        viewModel.onEvent(event)
        assert(viewModel.screenState.email == newEmail)
    }

    @Test
    fun `test OnUsernameChanged event`() {
        val viewModel = SignupScreenViewModel(authRepository)
        val newUsername = "username"
        val event = SignupScreenEvent.OnUsernameChanged(newUsername)
        assert(viewModel.screenState.username == "")
        viewModel.onEvent(event)
        assert(viewModel.screenState.username == newUsername)
    }

    @Test
    fun `test OnPasswordChanged event`() {
        val viewModel = SignupScreenViewModel(authRepository)
        val newPassword = "password"
        val event = SignupScreenEvent.OnPasswordChanged(newPassword)
        assert(viewModel.screenState.password == "")
        viewModel.onEvent(event)
        assert(viewModel.screenState.password == newPassword)
    }

    @Test
    fun `test OnPasswordVisibilityToggleClicked event`() {
        val viewModel = SignupScreenViewModel(authRepository)
        val event = SignupScreenEvent.OnPasswordVisibilityToggleClicked
        assert(!viewModel.screenState.isPasswordVisible)
        viewModel.onEvent(event)
        assert(viewModel.screenState.isPasswordVisible)
    }

    @Test
    fun `test OnBirthdayChanged event`() {
        val viewModel = SignupScreenViewModel(authRepository)
        val newBirthday = "01/01/2000"
        val event = SignupScreenEvent.OnBirthdayChanged(newBirthday)
        assert(viewModel.screenState.birthday == "")
        viewModel.onEvent(event)
        assert(viewModel.screenState.birthday == newBirthday)
    }

    @Test
    fun `test OnDatePickerClicked event`() {
        val viewModel = SignupScreenViewModel(authRepository)
        val event = SignupScreenEvent.OnDatePickerClicked
        assert(!viewModel.screenState.isDatePickerVisible)
        viewModel.onEvent(event)
        assert(viewModel.screenState.isDatePickerVisible)
    }

    @Test
    fun `test OnAgreementChecked event`() {
        val viewModel = SignupScreenViewModel(authRepository)
        val event = SignupScreenEvent.OnAgreementChecked
        assert(!viewModel.screenState.isAgreementChecked)
        viewModel.onEvent(event)
        assert(viewModel.screenState.isAgreementChecked)
    }

    @Test
    fun `test DismissErrorDialog event`() {
        val event = SignupScreenEvent.DismissErrorDialog
        val viewModel = SignupScreenViewModel(authRepository).apply {
            error = "error"
        }

        assert(viewModel.error == "error")
        viewModel.onEvent(event)
        assert(viewModel.error == null)
    }
}