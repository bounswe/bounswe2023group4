package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.profile.model.ProfileInfoResponse

interface ProfileInfoRemoteDataSource {

    suspend fun fetchProfileInfo(userId: Int): Result<ProfileInfoResponse>
}