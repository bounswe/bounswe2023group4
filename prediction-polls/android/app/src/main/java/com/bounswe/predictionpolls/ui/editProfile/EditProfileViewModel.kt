package com.bounswe.predictionpolls.ui.editProfile

import android.net.Uri
import androidx.core.net.toFile
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.data.editProfile.EditProfileRepository
import com.bounswe.predictionpolls.data.editProfile.EditProfileRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class EditProfileViewModel @Inject constructor(private val repository: EditProfileRepository) :
    ViewModel() {
    fun updateProfilePhoto(imageUri: Uri) {
        viewModelScope.launch(Dispatchers.IO) {
            imageUri.toFile().let {
                repository.updateProfilePhoto(it)
            }
        }
    }

    fun updateProfileInfo(body: EditProfileRequest) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.updateProfile(body)
        }
    }
}