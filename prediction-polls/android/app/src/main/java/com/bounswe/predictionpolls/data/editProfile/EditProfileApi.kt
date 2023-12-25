package com.bounswe.predictionpolls.data.editProfile

import com.google.gson.annotations.SerializedName
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.asRequestBody
import retrofit2.http.Body
import retrofit2.http.Multipart
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Part
import java.io.File


interface EditProfileApi {

    @Multipart
    @POST("profiles/profilePhoto")
    suspend fun uploadProfilePhoto(
        @Part image: MultipartBody.Part,
        @Part("caption") caption: RequestBody
    )

    @PATCH("profiles")
    suspend fun updateProfile(@Body body: EditProfileRequest)
}


data class EditProfileRequest(
    val userId: Int?,
    val username: String?,
    val email: String?,
    @SerializedName("profile_picture")
    val profilePicture: String?,
    val points: Int?,
    val biography: String?,
    val birthday: String?,
    val isHidden: Boolean?
)

fun prepareFilePart(file: File): RequestBody = file.asRequestBody("image/*".toMediaTypeOrNull())
