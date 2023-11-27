package com.bounswe.predictionpolls.domain.profile

import com.bounswe.predictionpolls.common.Result
import javax.inject.Inject

class GetProfileInfoUseCase @Inject constructor(
    private val profileInfoRepository: ProfileInfoRepository
) {

    suspend operator fun invoke(username: String): Result<ProfileInfo> =
        profileInfoRepository.getProfileInfo(username)

}