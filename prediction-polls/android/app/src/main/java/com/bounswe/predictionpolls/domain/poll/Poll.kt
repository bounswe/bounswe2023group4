package com.bounswe.predictionpolls.domain.poll

import kotlinx.collections.immutable.ImmutableList

sealed interface Poll {
    val creatorProfilePictureUri: String
    val pollCreatorName: String
    val pollQuestionTitle: String
    val dueDate: String
    val rejectionText: String
    val commentCount: Int

    data class ContinuousPoll(
        override val creatorProfilePictureUri: String,
        override val dueDate: String,
        override val pollCreatorName: String,
        override val pollQuestionTitle: String,
        override val rejectionText: String,
        override val commentCount: Int,
        val options: ImmutableList<PollOption.ContinuousPollOption>
    ) : Poll

    data class DiscretePoll(
        override val creatorProfilePictureUri: String,
        override val dueDate: String,
        override val pollCreatorName: String,
        override val pollQuestionTitle: String,
        override val rejectionText: String,
        override val commentCount: Int,
    ) : Poll
}