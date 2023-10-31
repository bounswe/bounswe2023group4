package com.bounswe.predictionpolls.ui.signup

import androidx.compose.ui.res.stringResource
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.bounswe.predictionpolls.ui.signup.*
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith


@RunWith(AndroidJUnit4::class)
class SignupScreenTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun emailInput_updatesText() {
        var emailText = ""
        composeTestRule.setContent {
            SignupScreenUI(
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
    fun usernameInput_updatesText() {
        var usernameText = ""
        composeTestRule.setContent {
            SignupScreenUI(
                username = usernameText,
                onUsernameChanged = { usernameText = it }
            )
        }

        composeTestRule
            .onNode(hasTestTag("username_input"))
            .performTextInput("username123")

        assert(usernameText == "username123")
    }

    @Test
    fun passwordInput_updatesText() {
        var passwordText = ""
        composeTestRule.setContent {
            SignupScreenUI(
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
    fun signupButton_triggersSignUp() {
        var signUpClicked = false
        composeTestRule.setContent {
            SignupScreenUI(
                isSignUpEnabled = true,
                onSignUpClicked = { signUpClicked = true }
            )
        }

        composeTestRule
            .onNode(hasTestTag("signup_button"))
            .performClick()

        assert(signUpClicked)
    }

    @Test
    fun agreementCheckbox_togglesAgreement() {
        var isAgreementChecked = false
        composeTestRule.setContent {
            SignupScreenUI(
                isAgreementChecked = isAgreementChecked,
                onAgreementChecked = { isAgreementChecked = it }
            )
        }

        composeTestRule
            .onNode(hasTestTag("agreement_checkbox"))
            .performClick()

        assert(isAgreementChecked)
    }

    @Test
    fun errorDialog_displaysError() {
        composeTestRule.setContent {
            SignupScreenUI(
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
        var confirmButtonTitle = ""
        composeTestRule.setContent {
            confirmButtonTitle = stringResource(id = com.bounswe.predictionpolls.R.string.ok)
            SignupScreenUI(
                error = error,
                errorDismissed = { error = null }
            )
        }

        composeTestRule
            .onNodeWithText(confirmButtonTitle)
            .performClick()

        assert(error == null)
    }
}

