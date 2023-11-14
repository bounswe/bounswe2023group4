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

    fun reduce(event: LeaderboardScreenEvent): LeaderboardScreenState {
        return when (event) {
            is LeaderboardScreenEvent.OnTagSelected -> this.copy(selectedTag = event.tag)
            else -> {
                this
            }
        }
    }
}
