package com.bounswe.predictionpolls.repo

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.feed.FeedRepository
import com.bounswe.predictionpolls.domain.poll.Poll
import kotlinx.collections.immutable.persistentListOf

class FakeFeedRepository : FeedRepository {
    // Test data
    private val polls = listOf(
        Poll.DiscretePoll(
            polId = "1",
            creatorProfilePictureUri = null,
            dueDate = "2023-12-31",
            pollCreatorName = "Test User",
            pollQuestionTitle = "Sample Poll 1",
            rejectionText = null,
            commentCount = 5,
            tags = listOf("test", "sample"),
            isOpen = true,
            pollCreatorUsername = "testuser",
            options = persistentListOf() // Add your options here
        ),
        // Add more Poll objects as needed for testing
    )

    override suspend fun getPolls(page: Int): Result<List<Poll>> {
        // Return the test data, simulating a successful response
        return Result.Success(polls)
    }
}