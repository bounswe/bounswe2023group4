package com.bounswe.predictionpolls.domain.profile

import com.bounswe.predictionpolls.common.Result

interface ProfileRepository {
    suspend fun getProfileInfo(userId: Int): Result<ProfileInfo>

}