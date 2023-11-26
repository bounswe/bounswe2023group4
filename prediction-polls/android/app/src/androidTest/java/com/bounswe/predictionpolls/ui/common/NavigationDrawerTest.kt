package com.bounswe.predictionpolls.ui.common

import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.bounswe.predictionpolls.utils.NavItem
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class NavigationDrawerTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun navigationDrawer_defaultSelection() {
        val titleIds = NavItem.values().map { it.titleId }
        var titles = listOf<String>()

        composeTestRule.setContent {
            titles = titleIds.map { stringResource(id = it) }
            NavigationDrawer() {
                Button(
                    onClick = {
                        it()
                    }) {
                    Text("Toggle Drawer")
                }
            }
        }

        titles.forEach {
            composeTestRule.onNodeWithText(it).assertIsNotDisplayed()
        }
        composeTestRule.onNodeWithText("Toggle Drawer").apply {
            performClick()
        }
        composeTestRule.waitForIdle()
        titles.forEach {
            composeTestRule.onNodeWithText(it).assertIsDisplayed()
        }
    }

    @Test
    fun navigationDrawer_itemClick() {
        var selectedNavItem = NavItem.FEED
        var clickedTitle = ""

        composeTestRule.setContent {
            clickedTitle = stringResource(id = NavItem.PROFILE.titleId)
            NavigationDrawer(
                onButtonClick = {
                    selectedNavItem = it
                }
            )
        }

        composeTestRule.onNodeWithText(clickedTitle).performClick()
        assert(selectedNavItem == NavItem.PROFILE)
    }
}
