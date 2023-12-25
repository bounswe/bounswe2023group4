package com.bounswe.predictionpolls.ui.leaderboard

import com.bounswe.predictionpolls.domain.leaderboard.LeaderboardTopics
import com.bounswe.predictionpolls.domain.leaderboard.TopicLeaderboard

data class LeaderboardScreenState(
    val tags: List<String> = LeaderboardTopics.values().map {
        it.name.lowercase().replaceFirstChar {
            it.uppercaseChar()
        }
    },
    val selectedTag: String = tags.first(),
    val leaderboardList: List<TopicLeaderboard.User> = emptyList(),
) {
    fun reduce(event: LeaderboardScreenEvent): LeaderboardScreenState {
        return when (event) {
            is LeaderboardScreenEvent.OnTagSelected -> this.copy(selectedTag = event.tag)
            else -> {
                this
            }
        }
    }
}
