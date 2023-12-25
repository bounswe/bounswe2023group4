package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.core.BaseRepository
import com.bounswe.predictionpolls.data.remote.services.LeaderboardService
import com.bounswe.predictionpolls.domain.leaderboard.TopicLeaderboard
import javax.inject.Inject

class LeaderboardRepository @Inject constructor(
    private val leaderboardService: LeaderboardService
) : BaseRepository(), LeaderboardRepositoryInterface {
    override suspend fun getLeaderboard(topic: String): TopicLeaderboard {
        return execute {
            leaderboardService.getLeaderboard(topic).toTopicLeaderboard()
        }
    }
}