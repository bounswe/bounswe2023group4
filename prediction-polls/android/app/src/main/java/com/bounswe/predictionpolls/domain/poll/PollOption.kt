package com.bounswe.predictionpolls.domain.poll

sealed interface PollOption {
    data class ContinuousPollOption(val id: String, val text: String, val voteCount: Int): PollOption
}