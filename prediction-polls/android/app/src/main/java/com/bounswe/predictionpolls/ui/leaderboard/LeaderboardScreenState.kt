package com.bounswe.predictionpolls.ui.leaderboard

data class LeaderboardScreenState(
    val tags: List<String> = emptyList(),
    val selectedTag: String = "",
    val leaderboardList: List<LeaderboardItem> = emptyList(),
) {
    companion object {
        val DUMMY_STATE = LeaderboardScreenState(
            tags = listOf("E-sport", "NBA", "Football", "Tennis"),
            selectedTag = "E-sport",
            leaderboardList = listOf(
                LeaderboardItem(
                    username = "yigit",
                    image = "yigit",
                    score = 420
                ),
                LeaderboardItem(
                    username = "ahmet",
                    image = "",
                    score = 410
                ),
                LeaderboardItem(
                    username = "ozan",
                    image = "",
                    score = 400
                ),
                LeaderboardItem(
                    username = "batuhan",
                    image = "",
                    score = 390
                ),
                LeaderboardItem(
                    username = "şefik",
                    image = "",
                    score = 380
                ),
                LeaderboardItem(
                    username = "yusuf",
                    image = "",
                    score = 370
                ),
                LeaderboardItem(
                    username = "merve",
                    image = "",
                    score = 360
                ),
                LeaderboardItem(
                    username = "aslıhan",
                    image = "",
                    score = 350
                ),
                LeaderboardItem(
                    username = "mehmet",
                    image = "",
                    score = 340
                ),
                LeaderboardItem(
                    username = "ali",
                    image = "",
                    score = 330
                ),
                LeaderboardItem(
                    username = "veli",
                    image = "",
                    score = 320
                ),
                LeaderboardItem(
                    username = "ayşe",
                    image = "",
                    score = 310
                ),
            )
        )
    }

    data class LeaderboardItem(
        val username: String,
        val image: String,
        val score: Int,
    )

    fun reduce(event: LeaderboardScreenEvent): LeaderboardScreenState {
        return when (event) {
            is LeaderboardScreenEvent.OnTagSelected -> this.copy(selectedTag = event.tag)
            else -> {
                this
            }
        }
    }
}
