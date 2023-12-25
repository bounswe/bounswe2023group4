package com.bounswe.predictionpolls.domain.leaderboard

data class TopicLeaderboard(
    val userList: List<User>
) {
    data class User(
        val id: Int,
        val username: String,
        val amount: Int
    )
}
