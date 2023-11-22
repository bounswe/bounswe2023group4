package com.bounswe.predictionpolls.data.feed

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.feed.model.toPoll
import com.bounswe.predictionpolls.domain.feed.FeedRepository
import com.bounswe.predictionpolls.domain.poll.Poll
import javax.inject.Inject

class FeedRepositoryImpl @Inject constructor(
    private val feedRemoteDataSource: FeedRemoteDataSource
) : FeedRepository {
    override suspend fun getPolls(page: Int): Result<List<Poll>> =
        when (val result = feedRemoteDataSource.getPolls(page)) {
            is Result.Success -> {
                val polls = result.data.map { it.toPoll() }
                Result.Success(polls)
            }

            is Result.Error -> {
                Result.Error(result.exception)
            }
        }

}