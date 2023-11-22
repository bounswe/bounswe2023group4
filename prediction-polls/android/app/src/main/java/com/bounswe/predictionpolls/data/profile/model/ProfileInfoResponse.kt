package com.bounswe.predictionpolls.data.profile.model

import com.bounswe.predictionpolls.domain.profile.ProfileInfo
import kotlinx.collections.immutable.persistentListOf

// TODO: Implement this class when backend decides on the response format.
data class ProfileInfoResponse(val name: String) {

    fun toProfileInfo(): ProfileInfo {
        return ProfileInfo("", "", "", "", "", persistentListOf())
    }
}