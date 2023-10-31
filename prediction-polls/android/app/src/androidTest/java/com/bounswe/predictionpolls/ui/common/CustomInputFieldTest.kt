package com.bounswe.predictionpolls.ui.common

import androidx.compose.ui.res.stringResource
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class CustomInputFieldTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun customInputField_isDisplayed() {
        composeTestRule.setContent {
            CustomInputField(
                text = "Test Input"
            )
        }

        composeTestRule.onNodeWithText("Test Input").assertIsDisplayed()
    }

    @Test
    fun customInputField_textInputOutput() {
        var inputText = ""
        composeTestRule.setContent {
            CustomInputField(
                text = inputText,
                onTextChanged = { inputText = it }
            )
        }

        composeTestRule.onNode(hasSetTextAction()).performTextInput("New Text")

        assert(inputText == "New Text")
    }

    @Test
    fun customInputField_iconButtonClicked() {
        var iconClicked = false
        var description = ""

        composeTestRule.setContent {
            description = stringResource(com.bounswe.predictionpolls.R.string.ok)
            CustomInputField(
                trailingIconId = com.bounswe.predictionpolls.R.drawable.ic_google,
                trailingIconContentDescription = com.bounswe.predictionpolls.R.string.ok,
                onTrailingIconClicked = { iconClicked = true }
            )
        }

        composeTestRule.onNodeWithContentDescription(description).performClick()
        assert(iconClicked)
    }
}
