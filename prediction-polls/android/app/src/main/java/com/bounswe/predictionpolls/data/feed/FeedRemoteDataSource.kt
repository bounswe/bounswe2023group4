package com.bounswe.predictionpolls.data.feed

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.feed.model.PollResponse
import com.bounswe.predictionpolls.domain.poll.Poll

interface FeedRemoteDataSource {
    /**
     * Fetches the list of polls and returns the result.
     */
    suspend fun getPolls(page: Int): Result<List<PollResponse>>
}