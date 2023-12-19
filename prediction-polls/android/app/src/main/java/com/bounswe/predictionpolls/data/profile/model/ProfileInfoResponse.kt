package com.bounswe.predictionpolls.data.profile.model

import com.bounswe.predictionpolls.common.PredictionPollsError
import com.bounswe.predictionpolls.domain.profile.ProfileInfo
import com.google.gson.annotations.SerializedName
import kotlinx.collections.immutable.persistentListOf

/*
  "points": 0,
  "biography": "string",
  "birthday": "string",
  "isHidden": 0
 */
data class ProfileInfoResponse(
    @SerializedName("error")
    val predictionPollsError: PredictionPollsError?,
    val userId: Int?,
    val username: String?,
    val email: String?,
    @SerializedName("profile_picture")
    val profilePicture: String?,
    val coverPicture: String?,
    val biography: String?,
    val isHidden: Int?,
    val points: Int?,
    val birthday: String?,
) {

    fun toProfileInfo(): ProfileInfo? {
        return if (predictionPollsError == null && username != null) {
            ProfileInfo(
                username,
                "",
                coverPicture,
                profilePicture,
                biography,
                persistentListOf(),
                birthday,
                isHidden == 1
            )
        } else {
            null
        }
    }

}