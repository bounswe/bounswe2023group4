package com.bounswe.predictionpolls.ui.editProfile

import android.net.Uri
import androidx.core.net.toFile
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.editProfile.EditProfileRepository
import com.bounswe.predictionpolls.data.editProfile.EditProfileRequest
import com.bounswe.predictionpolls.domain.profile.GetCurrentUserProfileUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject


/*
EditProfileScreen(
            username = "YourUsername", // Replace with actual data or ViewModel logic
            onUsernameChanged = {},
            fullName = "YourFullName",
            onFullNameChanged = {},
            about = "YourAboutText",
            onAboutChanged = {},
            birthday = "YourBirthday",
            onBirthdayChanged = {},
            isShowInProfileSelected = true, // Or false, based on your logic
            onShowInProfileClicked = {},
            coverUri = "YourCoverUri",
            onCoverChanged = {},
            imageUri = "YourImageUri",
            onImageChanged = {},
            onSaveChangesClicked = {}
        )
 */
data class EditProfileScreenState(
    val userName: String,
    val fullName: String,
    val about: String,
    val birthday: String,
    val isShowInProfileSelected: Boolean,
    val coverUri: String,
    val imageUri: String,
    val error: String? = null
)

private val initialState = EditProfileScreenState(
    userName = "",
    fullName = "",
    about = "",
    birthday = "",
    isShowInProfileSelected = false,
    coverUri = "",
    imageUri = ""
)


@HiltViewModel
class EditProfileViewModel @Inject constructor(
    private val repository: EditProfileRepository,
    private val myProfileUseCase: GetCurrentUserProfileUseCase
) :
    ViewModel() {

    private val _uiState: MutableStateFlow<EditProfileScreenState> = MutableStateFlow(initialState)
    val uiState: StateFlow<EditProfileScreenState> = _uiState.asStateFlow()

    init {
        viewModelScope.launch(Dispatchers.IO) {
            val result = myProfileUseCase()
            if (result is Result.Success) {
                _uiState.update {
                    it.copy(
                        userName = result.data.username,
                        fullName = result.data.userFullName,
                        about = result.data.userDescription ?: "",
                        birthday = result.data.birthday ?: "",
                        isShowInProfileSelected = result.data.isHidden ?: false,
                        coverUri = result.data.coverPhotoUri ?: "",
                        imageUri = result.data.profilePictureUri ?: "",
                        error = null
                    )
                }
            } else {
                _uiState.value = _uiState.value.copy(error = "Error")
            }
        }
    }

    fun updateUsername(username: String) {
        _uiState.update {
            it.copy(userName = username)
        }
    }

    fun updateFullName(fullName: String) {
        _uiState.update {
            it.copy(fullName = fullName)
        }
    }

    fun updateAbout(about: String) {
        _uiState.update {
            it.copy(about = about)
        }
    }

    fun updateProfilePicture(imageUri: Uri) {
        _uiState.update {
            it.copy(imageUri = imageUri.toString())
        }
    }

    fun updateCoverPicture(coverUri: Uri) {
        _uiState.update {
            it.copy(coverUri = coverUri.toString())
        }
    }

    fun updateBirthday(birthday: String) {
        _uiState.update {
            it.copy(birthday = birthday)
        }
    }

    fun updateShowInProfile(isShowInProfileSelected: Boolean) {
        _uiState.update {
            it.copy(isShowInProfileSelected = isShowInProfileSelected)
        }
    }

    fun onSaveChangesClicked() {
        updateProfileInfo()
        if (_uiState.value.imageUri.isNotEmpty()) {
            updateProfilePhotoBackend(Uri.parse(_uiState.value.imageUri))
        }

        updateProfileInfo()
    }

    private fun updateProfilePhotoBackend(imageUri: Uri) {
        viewModelScope.launch(Dispatchers.IO) {
            imageUri.toFile().let {
                repository.updateProfilePhoto(it)
            }
        }
    }

    private fun updateProfileInfo() {
        viewModelScope.launch(Dispatchers.IO) {
            val state = _uiState.value
            val editRequest = EditProfileRequest(
                username = state.userName,
                userId = null,
                email = null,
                profilePicture = null,
                points = null,
                biography = state.about,
                isHidden = state.isShowInProfileSelected,
                birthday = state.birthday
            )
            repository.updateProfile(editRequest)
        }
    }
}