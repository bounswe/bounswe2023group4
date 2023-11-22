package com.bounswe.predictionpolls.data.feed

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.feed.model.PollResponse
import com.bounswe.predictionpolls.domain.poll.Poll
import javax.inject.Inject

class FeedRemoteDataSourceImpl @Inject constructor(
    private val feedApi: FeedApi
) : FeedRemoteDataSource {
    override suspend fun getPolls(page: Int): Result<List<PollResponse>> {
        TODO("Not yet implemented")
    }
}