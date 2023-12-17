package com.bounswe.predictionpolls.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.feed.GetFeedUseCase
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.profile.GetCurrentUserProfileUseCase
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

private data class MyProfileViewModelState(
    val profileInfo: ProfileInfo? = null,
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
                    ProfileScreenUiState.ProfileInfoFetched(profileInfo, error ?: "Unknown error")
                } else {
                    ProfileScreenUiState.ProfileAndFeedFetched(profileInfo, feed)
                }
            }
        }
    }
}


@HiltViewModel
class MyProfileViewModel @Inject constructor(
    private val getProfileInfoUseCase: GetCurrentUserProfileUseCase,
    private val getFeedUseCase: GetFeedUseCase
) : ViewModel() {

    private val _profileScreenUiState: MutableStateFlow<MyProfileViewModelState> =
        MutableStateFlow(MyProfileViewModelState())

    val profileScreenUiState: StateFlow<ProfileScreenUiState>
        get() = _profileScreenUiState
            .map { it.toProfileScreenUiState() }
            .stateIn(viewModelScope, SharingStarted.Eagerly, ProfileScreenUiState.Loading)


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