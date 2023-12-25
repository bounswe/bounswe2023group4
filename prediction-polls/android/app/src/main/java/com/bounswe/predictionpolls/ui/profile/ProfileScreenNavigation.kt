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
import androidx.navigation.navArgument
import com.bounswe.predictionpolls.domain.annotation.PollAnnotationPages
import com.bounswe.predictionpolls.ui.common.annotation.AnnotationViewModel
import com.bounswe.predictionpolls.ui.vote.navigateToPollVoteScreen

const val PROFILE_SCREEN_ROUTE = "profile/{username}"

fun NavGraphBuilder.profileScreen(navController: NavController) {
    composable(
        route = PROFILE_SCREEN_ROUTE,
        arguments = listOf(navArgument("username") { nullable = false })
    ) { backStackEntry ->
        val profileViewModel: ProfileScreenViewModel = hiltViewModel()
        val annotationViewModel: AnnotationViewModel = hiltViewModel()
        val username = backStackEntry.arguments?.getString("username") ?: return@composable

        LaunchedEffect(key1 = username) {
            if (
                profileViewModel.profileScreenUiState.value is ProfileScreenUiState.Loading ||
                profileViewModel.profileScreenUiState.value is ProfileScreenUiState.Error
            ) {
                annotationViewModel.getAnnotations(
                    PollAnnotationPages.PROFILE(username)
                )
                profileViewModel.fetchProfileInfo(username)
                profileViewModel.fetchFeed(username) // Updated to pass the username
            }
        }

        val profileScreenUiState by profileViewModel.profileScreenUiState.collectAsStateWithLifecycle()

        ProfileScreen(
            profileScreenUiState,
            onProfileClicked = {
                navController.navigateToProfileScreen(it)
            },
            null,
            onFollowClicked = {
                (profileScreenUiState as? ProfileScreenUiState.ProfileAndFeedFetched)?.let { profileScreenUiState ->
                    if (profileScreenUiState.isFollowedByLoggedUser == true) {
                        profileViewModel.unfollowUser(profileScreenUiState.profileInfo.userId)
                    } else
                        profileViewModel.followUser(profileScreenUiState.profileInfo.userId)
                }
            },
            onPollClicked = {
                navController.navigateToPollVoteScreen(it)
            }
        )
    }
}

fun NavController.navigateToProfileScreen(
    username: String,
    navOptions: NavOptions? = null,
    block: Navigator.Extras? = null
) {
    navigate("profile/$username", navOptions, block)
}
