package com.bounswe.predictionpolls.ui.common

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class ErrorDialogTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun errorDialog_Displayed_WhenError() {
        val errorMessage = "An unexpected error occurred. Please try again later."
        var errorTitle = ""
        var confirmButtonText = ""

        composeTestRule.setContent {
            errorTitle = stringResource(id = com.bounswe.predictionpolls.R.string.error_dialog_title)
            confirmButtonText = stringResource(id = com.bounswe.predictionpolls.R.string.ok)
            ErrorDialog(error = errorMessage)
        }

        composeTestRule.onNodeWithText(errorTitle).assertIsDisplayed()
        composeTestRule.onNodeWithText(confirmButtonText).assertIsDisplayed()
        composeTestRule.onNodeWithText(errorMessage).assertIsDisplayed()
    }

    @Test
    fun errorDialog_NotDisplayed_WhenNoError() {
        var errorTitle = ""
        var confirmButtonText = ""

        composeTestRule.setContent {
            errorTitle = stringResource(id = com.bounswe.predictionpolls.R.string.error_dialog_title)
            confirmButtonText = stringResource(id = com.bounswe.predictionpolls.R.string.ok)
            ErrorDialog(error = null)
        }

        composeTestRule.onNodeWithText(errorTitle).assertDoesNotExist()
        composeTestRule.onNodeWithText(confirmButtonText).assertDoesNotExist()
    }

    @Test
    fun errorDialog_Dismissed_OnConfirmClick() {
        var errorTitle = ""
        var confirmButtonText = ""
        var errorMessage: String? by mutableStateOf("An unexpected error occurred. Please try again later.")
        val dismissDialog: () -> Unit = { errorMessage = null }

        composeTestRule.setContent {
            errorTitle = stringResource(id = com.bounswe.predictionpolls.R.string.error_dialog_title)
            confirmButtonText = stringResource(id = com.bounswe.predictionpolls.R.string.ok)
            ErrorDialog(
                error = errorMessage,
                onDismiss = dismissDialog
            )
        }

        composeTestRule.onNodeWithText(confirmButtonText).apply {
            assertIsDisplayed()
            performClick()
        }
        composeTestRule.waitForIdle()
        composeTestRule.onNodeWithText(errorTitle).assertDoesNotExist()
        composeTestRule.onNodeWithText(confirmButtonText).assertDoesNotExist()
        assert(errorMessage == null)
    }
}
