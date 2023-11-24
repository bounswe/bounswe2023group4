package com.bounswe.predictionpolls.data.feed

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.feed.model.PollResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject

class FeedRemoteDataSourceImpl @Inject constructor(
    private val feedApi: FeedApi
) : FeedRemoteDataSource {
    override suspend fun getPolls(page: Int): Result<List<PollResponse>> = withContext(Dispatchers.IO) {
        try {
            val response = feedApi.getPolls()
            Result.Success(response)
        } catch (e: Exception) {
            Result.Error(e)
        }
    }
}