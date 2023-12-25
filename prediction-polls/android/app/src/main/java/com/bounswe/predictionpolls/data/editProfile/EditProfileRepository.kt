package com.bounswe.predictionpolls.data.editProfile

import android.util.Log
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import javax.inject.Inject

class EditProfileRepository @Inject constructor(
    private val editProfileApi: EditProfileApi
) {

    suspend fun uploadProfilePhoto(file: File, caption: String) {

        // Create RequestBody instances for image and caption
        val requestFile = RequestBody.create("image/*".toMediaTypeOrNull(), file)
        val imageBody = MultipartBody.Part.createFormData("image", file.name, requestFile)
        val captionBody = RequestBody.create("text/plain".toMediaTypeOrNull(), caption)

        try {
            editProfileApi.uploadProfilePhoto(imageBody, captionBody)
        } catch (error: Exception) {
            // Handle network error
            Log.e("TAG", "uploadProfilePhoto: $error", )
        }
    }

    suspend fun updateProfile(body: EditProfileRequest) {
        editProfileApi.updateProfile(body)
    }
}