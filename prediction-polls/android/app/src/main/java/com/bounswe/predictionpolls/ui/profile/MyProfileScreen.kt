package com.bounswe.predictionpolls.ui.profile


import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable
import com.bounswe.predictionpolls.ui.editProfile.navigateToEditProfileScreen

const val MY_PROFILE_SCREEN_ROUTE = "MY_PROFILE_SCREEN_ROUTE"

fun NavGraphBuilder.myProfileScreen(navController: NavController) {
    composable(
        route = MY_PROFILE_SCREEN_ROUTE,
    ) { backStackEntry ->
        val profileViewModel: MyProfileViewModel = hiltViewModel()

        LaunchedEffect(Unit) {
            profileViewModel.fetchProfileInfo()
            profileViewModel.fetchFeed(0) // Updated to pass the username
        }

        val profileScreenUiState by profileViewModel.profileScreenUiState.collectAsStateWithLifecycle()

        ProfileScreen(profileScreenUiState, onProfileClicked = {
            navController.navigateToProfileScreen(it)
        },
            onEditProfileClicked = {
                navController.navigateToEditProfileScreen()
            })
    }
}

fun NavController.navigateToMyProfileScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(MY_PROFILE_SCREEN_ROUTE, navOptions, block)
}
