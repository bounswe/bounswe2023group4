package com.bounswe.predictionpolls.domain.moderation

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.data.remote.repositories.ModerationRepositoryInterface
import com.bounswe.predictionpolls.domain.profile.GetCurrentUserProfileUseCase
import javax.inject.Inject

class ModeratorUseCase @Inject constructor(
    private val moderationRepository: ModerationRepositoryInterface,
    private val getCurrentUserProfileUseCase: GetCurrentUserProfileUseCase
) {
    suspend fun getModeratorStatus(): Boolean {
        return when (val result = getCurrentUserProfileUseCase()) {
            is Result.Success -> {
                result.data.isMod ?: false
            }
            else -> {
                false
            }
        }
    }

    suspend fun requestPromotion() {
        return moderationRepository.requestPromotion()
    }

    suspend fun getModeratorRequests(): List<ModeratorPoll> {
        return moderationRepository.getRequests()
    }

    suspend fun concludeRequest(moderatorPoll: ModeratorPoll, choice: Any) {
        return moderationRepository.concludeRequest(moderatorPoll, choice)
    }

    suspend fun getModeratorTags(): List<ModeratorTag> {
        return moderationRepository.getMyTags()
    }

    suspend fun updateModeratorTag(moderatorTag: ModeratorTag) {
        return moderationRepository.updateTag(moderatorTag)
    }
}