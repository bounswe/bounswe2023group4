package com.bounswe.predictionpolls.domain.feed

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.poll.Poll

interface FeedRepository {
    /**
     * Fetches the list of polls and returns the result.
     */
    suspend fun getPolls(page: Int): Result<List<Poll>>
}