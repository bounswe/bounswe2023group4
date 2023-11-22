package com.bounswe.predictionpolls.domain.profile

import com.bounswe.predictionpolls.common.Result
import javax.inject.Inject

class GetProfileInfoUseCase @Inject constructor(
    private val profileRepository: ProfileRepository
) {

    suspend operator fun invoke(userId: Int): Result<ProfileInfo> =
        profileRepository.getProfileInfo(userId)

}