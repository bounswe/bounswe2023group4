package com.bounswe.predictionpolls.domain.feed

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.poll.Poll
import kotlinx.collections.immutable.ImmutableList
import kotlinx.collections.immutable.toImmutableList
import javax.inject.Inject

class GetFeedUseCase @Inject constructor(
    private val feedRepository: FeedRepository
) {
    suspend operator fun invoke(page: Int): Result<ImmutableList<Poll>> =
        when (val result = feedRepository.getPolls(page)) {
            is Result.Success -> {
                Result.Success(result.data.toImmutableList())
            }

            is Result.Error -> {
                Result.Error(result.exception)
            }
        }

}