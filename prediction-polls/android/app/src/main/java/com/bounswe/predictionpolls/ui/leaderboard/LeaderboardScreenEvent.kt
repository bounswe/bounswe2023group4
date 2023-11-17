package com.bounswe.predictionpolls.ui.leaderboard

sealed class LeaderboardScreenEvent {
    data class OnTagSelected(val tag: String) : LeaderboardScreenEvent()
}