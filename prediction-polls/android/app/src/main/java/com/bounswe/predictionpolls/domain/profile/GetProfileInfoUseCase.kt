package com.bounswe.predictionpolls.domain.profile

import com.bounswe.predictionpolls.common.Result
import javax.inject.Inject

class GetProfileInfoUseCase @Inject constructor(
    private val profileInfoRepository: ProfileInfoRepository
) {

    suspend operator fun invoke(userId: Int): Result<ProfileInfo> =
        profileInfoRepository.getProfileInfo(userId)

}