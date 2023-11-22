package com.bounswe.predictionpolls.ui.profile

import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.profile.ProfileInfo
import kotlinx.collections.immutable.ImmutableList

sealed interface ProfileScreenUiState {
    data object Loading : ProfileScreenUiState

    /**
     * Indicates that the profile info cannot be fetched.
     */
    data class Error(val message: String) : ProfileScreenUiState

    /**
     * Indicates that the profile info is fetched successfully but feed cannot be fetched.
     */
    data class ProfileInfoFetched(val profileInfo: ProfileInfo, val errorMessage: String) : ProfileScreenUiState


    data class ProfileAndFeedFetched(val profileInfo: ProfileInfo, val feed: ImmutableList<Poll>) : ProfileScreenUiState

}