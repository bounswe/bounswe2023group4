package com.bounswe.predictionpolls.ui.moderation.list

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.domain.moderation.ModeratorUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class ModerationScreenViewModel @Inject constructor(
    private val moderatorUseCase: ModeratorUseCase
) : BaseViewModel() {
    var screenState by mutableStateOf(ModerationScreenState())
        private set

    init {
        fetchTags()
        fetchRequests()
    }

    fun onEvent(event: ModerationScreenEvent) {
        screenState = screenState.reduce(event)

        when (event) {
            else -> {}
        }
    }

    private fun fetchTags(){
        launchCatching(
            onSuccess = {
                screenState = screenState.copy(
                    tags = it
                )
            },
        ) {
            moderatorUseCase.getModeratorTags()
        }
    }

    private fun fetchRequests() {
        launchCatching(
            onSuccess = {
                screenState = screenState.copy(
                    requestedPolls = it
                )
            },
        ) {
            moderatorUseCase.getModeratorRequests()
        }
    }

    private fun updateTag(tagId: Int, isSelected: Boolean) {
        launchCatching(
            onSuccess = {
                fetchRequests()
            },
        ) {
            moderatorUseCase.updateModeratorTag(
                screenState.tags[tagId].copy(
                    isSelected = isSelected
                ),
            )
        }
    }
}