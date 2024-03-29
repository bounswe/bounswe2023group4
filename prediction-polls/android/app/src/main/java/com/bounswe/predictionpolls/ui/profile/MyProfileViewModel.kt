package com.bounswe.predictionpolls.ui.profile

import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.PollRepositoryInterface
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.profile.FollowUnfollowUseCase
import com.bounswe.predictionpolls.domain.profile.GetCurrentUserProfileUseCase
import com.bounswe.predictionpolls.domain.profile.ProfileInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.collections.immutable.ImmutableList
import kotlinx.collections.immutable.toImmutableList
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

private data class MyProfileViewModelState(
    val profileInfo: ProfileInfo? = null,
    val userId: String? = null,
    val isCurrentUserFollowed: Boolean? = null,
    val followerCount: Int = 0,
    val followedCount: Int = 0,
    val feed: ImmutableList<Poll>? = null,
    val isLoading: Boolean = true,
    val error: String? = null
) {
    fun toProfileScreenUiState(): ProfileScreenUiState {
        return if (isLoading) {
            ProfileScreenUiState.Loading
        } else {
            if (profileInfo == null) {
                ProfileScreenUiState.Error(error ?: "Unknown error")
            } else {
                if (feed == null) {
                    ProfileScreenUiState.ProfileInfoFetched(
                        profileInfo,
                        error ?: "Unknown error",
                        followerCount,
                        followedCount,
                        isCurrentUserFollowed
                    )
                } else {
                    ProfileScreenUiState.ProfileAndFeedFetched(
                        profileInfo,
                        feed,
                        followerCount,
                        followedCount,
                        isCurrentUserFollowed
                    )
                }
            }
        }
    }
}


@HiltViewModel
class MyProfileViewModel @Inject constructor(
    private val getProfileInfoUseCase: GetCurrentUserProfileUseCase,
    private val followUnfollowUseCase: FollowUnfollowUseCase,
    private val pollRepository: PollRepositoryInterface,
) : BaseViewModel() {

    private val _profileScreenUiState: MutableStateFlow<MyProfileViewModelState> =
        MutableStateFlow(MyProfileViewModelState())

    val profileScreenUiState: StateFlow<ProfileScreenUiState>
        get() = _profileScreenUiState
            .map { it.toProfileScreenUiState() }
            .stateIn(viewModelScope, SharingStarted.Eagerly, ProfileScreenUiState.Loading)


    private suspend fun getFollowers() {
        val userId =
            _profileScreenUiState.value.profileInfo?.userId
                ?: return
        when (val result = followUnfollowUseCase.getFollowers(userId)) {
            is Result.Success -> {
                _profileScreenUiState.update {
                    it.copy(
                        followerCount = result.data.size,
                        error = null
                    )
                }
            }

            is Result.Error -> {
                _profileScreenUiState.update {
                    it.copy(
                        error = result.exception.message
                    )
                }
            }
        }
    }



    private suspend fun getFollowed() {
        val userId =
            _profileScreenUiState.value.profileInfo?.userId
                ?: return
        when (val result = followUnfollowUseCase.getFollowed(userId)) {
            is Result.Success -> {
                _profileScreenUiState.update {
                    it.copy(
                        followedCount = result.data.size,
                        error = null
                    )
                }
            }

            is Result.Error -> {
                _profileScreenUiState.update {
                    it.copy(
                        error = result.exception.message
                    )
                }
            }
        }
    }

    fun fetchProfileInfo() = viewModelScope.launch {
        _profileScreenUiState.update { it.copy(isLoading = true) }
        when (val result = getProfileInfoUseCase()) {
            is Result.Success -> {
                _profileScreenUiState.update {
                    it.copy(
                        isLoading = false,
                        profileInfo = result.data,
                        error = null
                    )
                }
            }

            is Result.Error -> {
                _profileScreenUiState.update {
                    it.copy(
                        isLoading = false,
                        error = result.exception.message,
                        profileInfo = null
                    )
                }
            }
        }

        getFollowers()
        getFollowed()
    }

    fun fetchFeed(page: Int) = viewModelScope.launch {
        _profileScreenUiState.update { it.copy(isLoading = true) }

        launchCatching(
            onSuccess = { polls ->
                _profileScreenUiState.update {
                    it.copy(
                        isLoading = false,
                        feed = polls.toImmutableList(),
                        error = null
                    )
                }
            },
            onError = { exception ->
                _profileScreenUiState.update {
                    it.copy(
                        isLoading = false,
                        error = exception?.message,
                        feed = null
                    )
                }
            }
        ) {
            pollRepository.getOpenedPollsForMe()
        }
    }
}