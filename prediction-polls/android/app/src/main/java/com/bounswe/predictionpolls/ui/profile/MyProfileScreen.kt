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
import com.bounswe.predictionpolls.domain.annotation.PollAnnotationPages
import com.bounswe.predictionpolls.ui.common.annotation.AnnotationViewModel
import com.bounswe.predictionpolls.ui.editProfile.navigateToEditProfileScreen
import com.bounswe.predictionpolls.ui.vote.navigateToPollVoteScreen

const val MY_PROFILE_SCREEN_ROUTE = "MY_PROFILE_SCREEN_ROUTE"

fun NavGraphBuilder.myProfileScreen(navController: NavController) {
    composable(
        route = MY_PROFILE_SCREEN_ROUTE,
    ) { backStackEntry ->
        val profileViewModel: MyProfileViewModel = hiltViewModel()
        val annotationViewModel: AnnotationViewModel = hiltViewModel()

        LaunchedEffect(Unit) {
            profileViewModel.fetchProfileInfo()
            profileViewModel.fetchFeed(0) // Updated to pass the username
        }

        val profileScreenUiState by profileViewModel.profileScreenUiState.collectAsStateWithLifecycle()

        LaunchedEffect(profileScreenUiState) {
            if (profileScreenUiState is ProfileScreenUiState.ProfileAndFeedFetched) {
                val username =
                    (profileScreenUiState as ProfileScreenUiState.ProfileAndFeedFetched).profileInfo.username
                annotationViewModel.getAnnotations(
                    PollAnnotationPages.PROFILE(username)
                )
            }
        }

        ProfileScreen(
            profileScreenUiState,
            onProfileClicked = {
                navController.navigateToProfileScreen(it)
            },
            onEditProfileClicked = {
                navController.navigateToEditProfileScreen()
            },
            onFollowClicked = {
            },
            onPollClicked = {
                navController.navigateToPollVoteScreen(it)
            }
        )
    }
}

fun NavController.navigateToMyProfileScreen(
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate(MY_PROFILE_SCREEN_ROUTE, navOptions, block)
}
