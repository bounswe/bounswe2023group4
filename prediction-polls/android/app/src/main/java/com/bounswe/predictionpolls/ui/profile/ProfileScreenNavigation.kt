package com.bounswe.predictionpolls.ui.profile

import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val PROFILE_SCREEN_ROUTE = "profile"

fun NavGraphBuilder.profileScreen(navController: NavController) {
    composable(PROFILE_SCREEN_ROUTE) {
        val profileViewModel: ProfileScreenViewModel = hiltViewModel()


        val profileScreenUiState by profileViewModel.profileScreenUiState.collectAsStateWithLifecycle()

        ProfileScreen(profileScreenUiState)

    }
}

fun NavController.navigateToFeedScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(PROFILE_SCREEN_ROUTE, navOptions, block)
}