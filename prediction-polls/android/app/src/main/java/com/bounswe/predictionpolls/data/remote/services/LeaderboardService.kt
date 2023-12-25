package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.model.response.GetLeaderboardResponse
import retrofit2.http.GET
import retrofit2.http.Path

interface LeaderboardService {
    @GET("profiles/leaderboard/{topic}")
    suspend fun getLeaderboard(
        @Path("topic") topic: String
    ): GetLeaderboardResponse
}