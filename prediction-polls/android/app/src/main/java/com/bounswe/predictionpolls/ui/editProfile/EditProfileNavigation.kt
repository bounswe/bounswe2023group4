package com.bounswe.predictionpolls.ui.editProfile

import android.net.Uri
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import androidx.navigation.compose.composable

const val EDIT_PROFILE_ROUTE = "edit_profile"

fun NavGraphBuilder.editProfileScreen(navController: NavController) {
    composable(EDIT_PROFILE_ROUTE) {
        val editProfileViewModel: EditProfileViewModel = hiltViewModel()
        val state by editProfileViewModel.uiState.collectAsStateWithLifecycle()
        LaunchedEffect(key1 = state.isSuccess) {
            if (state.isSuccess.not()) return@LaunchedEffect
            navController.popBackStack()
        }
        if (state.error != null) {
            Column(modifier = Modifier.fillMaxSize()) {
                Text(text = "ERROR")
                Button(onClick = { navController.popBackStack() }) {
                    Text(text = "Go Back")

                }
            }
        } else {
            val context = LocalContext.current
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
                    editProfileViewModel.onSaveChangesClicked(context)
                }
            )
        }

    }
}

fun NavController.navigateToEditProfileScreen(
    navOptions: NavOptions? = null,
    extras: Navigator.Extras? = null
) {
    navigate(EDIT_PROFILE_ROUTE, navOptions, extras)
}