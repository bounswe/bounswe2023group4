package com.bounswe.predictionpolls.data.remote.model.response

import com.bounswe.predictionpolls.domain.leaderboard.TopicLeaderboard
import com.google.gson.annotations.SerializedName

data class GetLeaderboardResponse(
    val userList: List<User>
) {
    data class User(
        val id: Int,
        val username: String,
        val amount: Int,
        @SerializedName("profile_picture")
        val profilePicture: String?
    )

    fun toTopicLeaderboard(): TopicLeaderboard {
        return TopicLeaderboard(
            userList = userList.map { user ->
                TopicLeaderboard.User(
                    id = user.id,
                    username = user.username,
                    amount = user.amount,
                    profilePicture = user.profilePicture
                )
            }
        )
    }
}