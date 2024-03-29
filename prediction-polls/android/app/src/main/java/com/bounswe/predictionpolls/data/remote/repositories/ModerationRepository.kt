package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.core.BaseRepository
import com.bounswe.predictionpolls.data.remote.model.request.ModeratorRequest
import com.bounswe.predictionpolls.data.remote.model.request.ModeratorTagRequest
import com.bounswe.predictionpolls.data.remote.services.ModerationService
import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll
import com.bounswe.predictionpolls.domain.moderation.ModeratorTag
import javax.inject.Inject

class ModerationRepository @Inject constructor(
    private val moderationService: ModerationService
): ModerationRepositoryInterface, BaseRepository() {
    override suspend fun requestPromotion() {
        execute {
            moderationService.requestPromotion()
        }
    }

    override suspend fun getTags(): List<ModeratorTag> {
        return execute {
            moderationService.getTags().map { it.toModeratorTag() }
        }
    }

    override suspend fun updateTag(myTag: ModeratorTag) {
        execute {
            val request = ModeratorTagRequest(myTag.topic, myTag.isSelected)
            moderationService.updateTag(request)
        }
    }

    override suspend fun getRequests(): List<ModeratorPoll> {
        return execute {
            moderationService.getRequests().map { it.toModeratorPoll() }
        }
    }

    override suspend fun concludeRequest(moderatorPoll: ModeratorPoll, choice: Any) {
        execute {
            val request = ModeratorRequest(
                moderatorPoll.requestId,
                choice
            )
            moderationService.concludeRequest(request)
        }
    }
}