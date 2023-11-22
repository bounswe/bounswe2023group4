package com.bounswe.predictionpolls.domain.feed

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.poll.Poll
import javax.inject.Inject

class GetFeedUseCase @Inject constructor(
    private val feedRepository: FeedRepository
) {
    suspend operator fun invoke(page: Int): Result<List<Poll>> {
        return feedRepository.getPolls(page)
    }
}