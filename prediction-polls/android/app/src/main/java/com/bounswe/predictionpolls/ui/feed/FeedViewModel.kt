package com.bounswe.predictionpolls.ui.feed

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.feed.GetFeedUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class FeedViewModel @Inject constructor(private val getFeedUseCase: GetFeedUseCase) : ViewModel() {

    private val _feedUiState: MutableStateFlow<FeedUiState> = MutableStateFlow(FeedUiState.Loading)
    val feedUiState: StateFlow<FeedUiState>
        get() = _feedUiState.asStateFlow()


    fun fetchFeed(page: Int) = viewModelScope.launch(Dispatchers.IO) {
        _feedUiState.update { FeedUiState.Loading }

        val newState = when (val result = getFeedUseCase(page)) {
            is Result.Success -> {
                if (result.data.isEmpty()) {
                    FeedUiState.NoFeed
                } else {
                    FeedUiState.HasFeed(result.data, page)
                }
            }

            is Result.Error -> FeedUiState.Error(
                result.exception.message ?: "Unknown error"
            )
        }

        _feedUiState.update { newState }
    }
}