package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll
import com.bounswe.predictionpolls.domain.moderation.ModeratorTag

interface ModerationRepositoryInterface {
    suspend fun requestPromotion()
    suspend fun getTags(): List<ModeratorTag>
    suspend fun updateTag(myTag: ModeratorTag)
    suspend fun getRequests(): List<ModeratorPoll>
    suspend fun concludeRequest(moderatorPoll: ModeratorPoll, choice: Any)
}