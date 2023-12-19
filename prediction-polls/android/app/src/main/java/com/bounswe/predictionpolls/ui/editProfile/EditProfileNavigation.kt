package com.bounswe.predictionpolls.ui.editProfile

import android.net.Uri
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val EDIT_PROFILE_ROUTE = "edit_profile"

fun NavGraphBuilder.editProfileScreen() {
    composable(EDIT_PROFILE_ROUTE) {
        val editProfileViewModel: EditProfileViewModel = hiltViewModel()
        val state by editProfileViewModel.uiState.collectAsStateWithLifecycle()
        EditProfileScreen(
            username = state.userName, // Replace with actual data or ViewModel logic
            onUsernameChanged = {
                editProfileViewModel.updateUsername(it)
            },
            fullName = state.fullName,
            onFullNameChanged = {
                editProfileViewModel.updateFullName(it)
            },
            about = state.about,
            onAboutChanged = {
                editProfileViewModel.updateAbout(it)
            },
            birthday = state.birthday,
            onBirthdayChanged = {
                editProfileViewModel.updateBirthday(it)
            },
            isShowInProfileSelected = state.isShowInProfileSelected, // Or false, based on your logic
            onShowInProfileClicked = {
                editProfileViewModel.updateShowInProfile(state.isShowInProfileSelected.not())
            },
            coverUri = null,
            onCoverChanged = {},
            imageUri = state.imageUri,
            onImageChanged = {
                editProfileViewModel.updateProfilePicture(Uri.parse(it))
            },
            onSaveChangesClicked = {
                editProfileViewModel.onSaveChangesClicked()
            }
        )
    }
}

fun NavController.navigateToEditProfileScreen(
    navOptions: NavOptions? = null,
    extras: Navigator.Extras? = null
) {
    navigate(EDIT_PROFILE_ROUTE, navOptions, extras)
}