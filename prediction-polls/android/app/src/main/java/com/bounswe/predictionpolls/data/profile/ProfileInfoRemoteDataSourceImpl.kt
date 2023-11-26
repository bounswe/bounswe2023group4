package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.profile.model.ProfileInfoResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject

class ProfileInfoRemoteDataSourceImpl @Inject constructor(
    private val profileApi: ProfileApi
) : ProfileInfoRemoteDataSource {
    override suspend fun fetchProfileInfo(username: String): Result<ProfileInfoResponse> =
        withContext(Dispatchers.IO) {
            try {
                val response = profileApi.fetchProfileInfo(username)
                Result.Success(response)
            } catch (e: Exception) {
                Result.Error(e)
            }
        }
}