package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.profile.ProfileInfo
import com.bounswe.predictionpolls.domain.profile.ProfileInfoRepository
import javax.inject.Inject

class ProfileInfoRepositoryImpl @Inject constructor(
    private val profileInfoRemoteDataSource: ProfileInfoRemoteDataSource
) : ProfileInfoRepository {
    override suspend fun getProfileInfo(username: String): Result<ProfileInfo> {
        profileInfoRemoteDataSource.fetchProfileInfo(username).let { result ->
            return when (result) {
                is Result.Success -> {
                    val profileInfo = result.data.toProfileInfo()
                    if (profileInfo != null) {
                        Result.Success(profileInfo)
                    } else {
                        Result.Error(
                            Exception(
                                result.data.predictionPollsError?.message
                                    ?: "ProfileInfoResponse is not valid"
                            )
                        )
                    }
                }

                is Result.Error -> {
                    Result.Error(result.exception)
                }
            }
        }
    }
}