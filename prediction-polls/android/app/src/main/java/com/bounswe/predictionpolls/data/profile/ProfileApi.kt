package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.data.profile.model.ProfileInfoResponse
import retrofit2.http.GET
import retrofit2.http.Path

interface ProfileApi {

    @GET("profile/{profileId}")
    suspend fun fetchProfileInfo(@Path("profileId") profileId: String): ProfileInfoResponse
}