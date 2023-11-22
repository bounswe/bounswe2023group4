package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.profile.ProfileInfo
import com.bounswe.predictionpolls.domain.profile.ProfileInfoRepository
import javax.inject.Inject

class ProfileInfoInfoRepositoryImpl @Inject constructor(
    private val profileInfoRemoteDataSource: ProfileInfoRemoteDataSource
) : ProfileInfoRepository {
    override suspend fun getProfileInfo(userId: Int): Result<ProfileInfo> {
        profileInfoRemoteDataSource.fetchProfileInfo(userId).let { result ->
            return when (result) {
                is Result.Success -> {
                    Result.Success(result.data.toProfileInfo())
                }

                is Result.Error -> {
                    Result.Error(result.exception)
                }
            }
        }
    }
}