package com.bounswe.predictionpolls.ui.main

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class MainScreenUITest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun mainScreenUI_displaysCorrectButtons() {
        composeTestRule.setContent {
            MainScreenUI(
                onLoginClick = {},
                onSignUpClick = {},
                onContinueWithoutLoginClick = {}
            )
        }

        composeTestRule
            .onNode(hasTestTag("login_button"))
            .assertIsDisplayed()

        composeTestRule
            .onNode(hasTestTag("signup_button"))
            .assertIsDisplayed()

        composeTestRule
            .onNode(hasTestTag("continue_without_login_button"))
            .assertIsDisplayed()
    }

    @Test
    fun mainScreenUI_loginButton_performsClick() {
        var loginClicked = false
        composeTestRule.setContent {
            MainScreenUI(
                onLoginClick = { loginClicked = true },
                onSignUpClick = {},
                onContinueWithoutLoginClick = {}
            )
        }

        composeTestRule
            .onNode(hasTestTag("login_button"))
            .performClick()

        assert(loginClicked)
    }

    @Test
    fun mainScreenUI_signUpButton_performsClick() {
        var signUpClicked = false
        composeTestRule.setContent {
            MainScreenUI(
                onLoginClick = {},
                onSignUpClick = { signUpClicked = true },
                onContinueWithoutLoginClick = {}
            )
        }

        composeTestRule
            .onNode(hasTestTag("signup_button"))
            .performClick()

        assert(signUpClicked)
    }

    @Test
    fun mainScreenUI_continueWithoutLoginButton_performsClick() {
        var continueWithoutLoginClicked = false
        composeTestRule.setContent {
            MainScreenUI(
                onLoginClick = {},
                onSignUpClick = {},
                onContinueWithoutLoginClick = { continueWithoutLoginClicked = true }
            )
        }

        composeTestRule
            .onNode(hasTestTag("continue_without_login_button"))
            .performClick()

        assert(continueWithoutLoginClicked)
    }
}

