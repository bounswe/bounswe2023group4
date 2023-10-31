package com.bounswe.predictionpolls.ui.login

import androidx.compose.ui.res.stringResource
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.bounswe.predictionpolls.ui.login.*
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith


@RunWith(AndroidJUnit4::class)
class LoginScreenUITest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun emailInput_updatesText() {
        var emailText = ""
        composeTestRule.setContent {
            LoginScreenUI(
                email = emailText,
                onEmailChanged = { emailText = it }
            )
        }

        composeTestRule
            .onNode(hasTestTag("email_input"))
            .performTextInput("example@example.com")

        assert(emailText == "example@example.com")
    }

    @Test
    fun passwordInput_updatesText() {
        var passwordText = ""
        composeTestRule.setContent {
            LoginScreenUI(
                password = passwordText,
                onPasswordChanged = { passwordText = it }
            )
        }

        composeTestRule
            .onNode(hasTestTag("password_input"))
            .performTextInput("password123")

        assert(passwordText == "password123")
    }

    @Test
    fun loginButton_triggersLogin() {
        var loginClicked = false
        composeTestRule.setContent {
            LoginScreenUI(
                isLoginEnabled = true,
                onLoginClicked = { loginClicked = true }
            )
        }

        composeTestRule
            .onNode(hasTestTag("login_button"))
            .performClick()

        assert(loginClicked)
    }

    @Test
    fun errorDialog_displaysError() {
        composeTestRule.setContent {
            LoginScreenUI(
                error = "Sample Error Message",
                errorDismissed = {}
            )
        }

        composeTestRule
            .onNodeWithText("Sample Error Message")
            .assertIsDisplayed()
    }

    @Test
    fun errorDialog_dismissesError() {
        var error: String? = "Sample Error Message"
        var confirmTitle = ""
        composeTestRule.setContent {
            confirmTitle = stringResource(id = com.bounswe.predictionpolls.R.string.ok)
            LoginScreenUI(
                error = error,
                errorDismissed = { error = null }
            )
        }

        composeTestRule
            .onNodeWithText(confirmTitle)
            .performClick()

        assert(error == null)
    }
}