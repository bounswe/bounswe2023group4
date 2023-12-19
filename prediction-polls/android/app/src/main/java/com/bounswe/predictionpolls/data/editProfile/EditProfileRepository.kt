package com.bounswe.predictionpolls.data.editProfile

import com.bounswe.predictionpolls.data.profile.ProfileApi
import okhttp3.RequestBody
import java.io.File
import javax.inject.Inject

class EditProfileRepository @Inject constructor(
    private val editProfileApi: EditProfileApi
) {
    suspend fun updateProfilePhoto(image: File) {
        prepareFilePart(image).let {
            editProfileApi.updateProfilePhoto(it)
        }
    }

    suspend fun updateProfile(body: EditProfileRequest) {
        editProfileApi.updateProfile(body)
    }
}