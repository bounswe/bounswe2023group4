package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.data.profile.model.ProfileInfoResponse
import javax.inject.Inject

class ProfileInfoRemoteDataSourceImpl @Inject constructor(
    private val profileApi: ProfileApi
) : ProfileInfoRemoteDataSource {
    override suspend fun fetchProfileInfo(userId: Int): Result<ProfileInfoResponse> {
        TODO("Not yet implemented")
    }
}