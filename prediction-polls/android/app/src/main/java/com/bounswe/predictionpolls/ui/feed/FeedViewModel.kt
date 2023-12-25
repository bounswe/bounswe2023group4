package com.bounswe.predictionpolls.ui.feed

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.SemanticSearchRepository
import com.bounswe.predictionpolls.domain.feed.GetFeedUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

@HiltViewModel
class FeedViewModel @Inject constructor(
    private val getFeedUseCase: GetFeedUseCase,
    private val semanticSearchRepository: SemanticSearchRepository
) : BaseViewModel() {

    private val _feedUiState: MutableStateFlow<FeedUiState> = MutableStateFlow(FeedUiState.Loading)
    val feedUiState: StateFlow<FeedUiState>
        get() = _feedUiState.asStateFlow()

    var searchedTag by mutableStateOf("")
        private set

    private var fetchJob: Job? = null

    fun fetchFeed(page: Int){
        fetchJob?.cancel()
        fetchJob = viewModelScope.launch(Dispatchers.IO) {
            _feedUiState.update { FeedUiState.Loading }

            launchCatching(
                onSuccess = { polls ->
                    _feedUiState.update { FeedUiState.HasFeed(polls, page) }
                },
                onError = {
                    _feedUiState.update { FeedUiState.Error("Unknown error") }
                }
            ) {
                if (searchedTag.isEmpty()) {
                    getFeedUseCase(page).run {
                        if (this is Result.Success) {
                            this.data
                        } else {
                            emptyList()
                        }
                    }
                } else {
                    semanticSearchRepository.getPolls(searchedTag)
                }
            }
        }
    }

    fun onTagSearchTextChanged(text: String) {
        searchedTag = text
        fetchFeed(0)
    }
}