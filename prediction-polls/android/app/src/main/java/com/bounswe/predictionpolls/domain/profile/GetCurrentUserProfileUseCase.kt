package com.bounswe.predictionpolls.domain.profile

import com.bounswe.predictionpolls.common.Result
import javax.inject.Inject

class GetCurrentUserProfileUseCase @Inject constructor(
    private val profileInfoRepository: ProfileInfoRepository
) {

    suspend operator fun invoke(): Result<ProfileInfo> =
        profileInfoRepository.getCurrentUserProfileInfo()

}