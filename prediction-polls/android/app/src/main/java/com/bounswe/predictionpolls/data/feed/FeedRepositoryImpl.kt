package com.bounswe.predictionpolls.data.feed

import android.util.Log
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.feed.FeedRepository
import com.bounswe.predictionpolls.domain.poll.Poll
import javax.inject.Inject

private const val TAG = "FeedRepositoryImpl"

class FeedRepositoryImpl @Inject constructor(
    private val feedRemoteDataSource: FeedRemoteDataSource
) : FeedRepository {
    override suspend fun getPolls(page: Int): Result<List<Poll>> =
        when (val result = feedRemoteDataSource.getPolls(page)) {
            is Result.Success -> {
                val polls = result.data.mapNotNull {
                    try {
                        it.toPollDomainModel()
                    } catch (e: Exception) {
                        Log.e(TAG, "getPolls: $it cannot be converted to Poll")
                        null
                    }
                }
                Result.Success(polls)
            }

            is Result.Error -> {
                Result.Error(result.exception)
            }
        }

}