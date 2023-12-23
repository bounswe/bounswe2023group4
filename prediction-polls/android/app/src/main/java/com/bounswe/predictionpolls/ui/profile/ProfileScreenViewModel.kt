package com.bounswe.predictionpolls.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.feed.GetFeedUseCase
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.profile.FollowUnfollowUseCase
import com.bounswe.predictionpolls.domain.profile.GetCurrentUserProfileUseCase
import com.bounswe.predictionpolls.domain.profile.GetProfileInfoUseCase
import com.bounswe.predictionpolls.domain.profile.ProfileInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.collections.immutable.ImmutableList
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

private data class ProfileScreenViewModelState(
    val profileInfo: ProfileInfo? = null,
    val userId: String? = null,
    val isCurrentUserFollowed: Boolean = false,
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
class ProfileScreenViewModel @Inject constructor(
    private val getProfileInfoUseCase: GetProfileInfoUseCase,
    private val getCurrentUserProfileUseCase: GetCurrentUserProfileUseCase,
    private val getFeedUseCase: GetFeedUseCase,
    private val followUnfollowUseCase: FollowUnfollowUseCase
) : ViewModel() {

    private val _profileScreenUiState: MutableStateFlow<ProfileScreenViewModelState> =
        MutableStateFlow(ProfileScreenViewModelState())

    val profileScreenUiState: StateFlow<ProfileScreenUiState>
        get() = _profileScreenUiState
            .map { it.toProfileScreenUiState() }
            .stateIn(viewModelScope, SharingStarted.Eagerly, ProfileScreenUiState.Loading)

    private var loggedUserId: String? = null

    init {
        viewModelScope.launch {
            getCurrentUserProfileUseCase.invoke()
                .let { result ->
                    if (result is Result.Success) {
                        loggedUserId = result.data.userId
                        getFollowers()
                        getFollowed()
                    }
                }
        }
    }

    fun followUser(followedId: String) = viewModelScope.launch {
        val followerId =
            loggedUserId
                ?: return@launch
        when (val result = followUnfollowUseCase.followUser(followerId, followedId)) {
            is Result.Success -> {
                _profileScreenUiState.update {
                    it.copy(
                        isCurrentUserFollowed = true,
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

    fun unfollowUser(followedId: String) = viewModelScope.launch {
        val followerId =
            loggedUserId
                ?: return@launch
        when (val result = followUnfollowUseCase.unfollowUser(followerId, followedId)) {
            is Result.Success -> {
                _profileScreenUiState.update {
                    it.copy(
                        isCurrentUserFollowed = false,
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

    suspend fun getFollowers() {
        val userId =
            loggedUserId
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

    suspend fun getFollowed()  {
        val userId =
            loggedUserId
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


    fun fetchProfileInfo(userName: String) = viewModelScope.launch {
        _profileScreenUiState.update { it.copy(isLoading = true) }
        when (val result = getProfileInfoUseCase(userName)) {
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
    }

    fun fetchFeed(page: Int) = viewModelScope.launch {
        _profileScreenUiState.update { it.copy(isLoading = true) }

        when (val result = getFeedUseCase(page)) {
            is Result.Success -> {
                _profileScreenUiState.update {
                    it.copy(
                        isLoading = false,
                        feed = result.data,
                    )
                }
            }

            is Result.Error -> {
                _profileScreenUiState.update {
                    it.copy(
                        isLoading = false,
                        error = result.exception.message,
                        feed = null
                    )
                }
            }
        }
    }
}