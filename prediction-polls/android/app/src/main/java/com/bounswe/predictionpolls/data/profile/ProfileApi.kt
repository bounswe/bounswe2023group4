package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.data.profile.model.ProfileInfoResponse
import retrofit2.http.GET
import retrofit2.http.Query

interface ProfileApi {

    @GET("profiles")
    suspend fun fetchProfileInfo(@Query("username") username: String): ProfileInfoResponse

    @GET("profiles/myProfile")
    suspend fun fetchCurrentUserProfileInfo(): ProfileInfoResponse
}