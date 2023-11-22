package com.bounswe.predictionpolls.data.feed

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.feed.model.PollResponse
import javax.inject.Inject

// TODO: Implement this class
class FeedRemoteDataSourceImpl @Inject constructor(
//    private val feedApi: FeedApi
) : FeedRemoteDataSource {
    override suspend fun getPolls(page: Int): Result<List<PollResponse>> {
        TODO("Not yet implemented")
    }
}