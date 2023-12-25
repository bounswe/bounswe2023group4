package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.domain.leaderboard.TopicLeaderboard

interface LeaderboardRepositoryInterface {
    suspend fun getLeaderboard(
        topic: String
    ): TopicLeaderboard
}