package com.bounswe.predictionpolls.domain.poll

import androidx.compose.runtime.Immutable
import kotlinx.collections.immutable.ImmutableList

@Immutable
sealed interface Poll {
    val polId: String
    val creatorProfilePictureUri: String?
    val pollCreatorName: String
    val pollCreatorUsername: String
    val pollQuestionTitle: String
    val dueDate: String?
    val rejectionText: String?
    val commentCount: Int
    val isOpen: Boolean
    val tags: List<String>

    data class ContinuousPoll(
        override val polId: String,
        override val creatorProfilePictureUri: String?,
        override val pollCreatorUsername: String,
        override val dueDate: String?,
        override val pollCreatorName: String,
        override val pollQuestionTitle: String,
        override val rejectionText: String?,
        override val commentCount: Int,
        override val isOpen: Boolean,
        override val tags: List<String>,
        val inputType: ContinuousVoteInputType,
    ) : Poll

    data class DiscretePoll(
        override val polId: String,
        override val creatorProfilePictureUri: String?,
        override val pollCreatorUsername: String,
        override val dueDate: String?,
        override val pollCreatorName: String,
        override val pollQuestionTitle: String,
        override val rejectionText: String?,
        override val commentCount: Int,
        override val isOpen: Boolean,
        override val tags: List<String>,
        val options: ImmutableList<PollOption.DiscreteOption>
    ) : Poll
}