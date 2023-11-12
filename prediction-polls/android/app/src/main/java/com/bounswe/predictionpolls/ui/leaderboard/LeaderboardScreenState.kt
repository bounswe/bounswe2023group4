package com.bounswe.predictionpolls.ui.leaderboard

data class LeaderboardScreenState(
    val dropdownItems: List<String> = emptyList(),
    val leaderboardList: List<LeaderboardItem> = emptyList(),
) {
    companion object {
        val DUMMY_STATE = LeaderboardScreenState(
            dropdownItems = listOf("E-sport", "NBA", "Football", "Tennis"),
            leaderboardList = (0..20).reversed().map {
                LeaderboardItem(
                    username = "user$it",
                    image = "",
                    score = it * 10
                )
            }
        )
    }

    data class LeaderboardItem(
        val username: String,
        val image: String,
        val score: Int,
    )
}
