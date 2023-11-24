package com.bounswe.predictionpolls.data.feed

import com.bounswe.predictionpolls.data.feed.model.PollResponse
import retrofit2.http.GET

interface FeedApi {
    /**
     * Fetches the list of polls and returns the result.
     */
    @GET("/polls")
    suspend fun getPolls(): List<PollResponse>
}