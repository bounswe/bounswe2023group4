package com.bounswe.predictionpolls.ui.moderation.apply

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.domain.moderation.ModeratorUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class ModerationApplyViewModel @Inject constructor(
    private val moderatorUseCase: ModeratorUseCase
): BaseViewModel() {
    var screenState by mutableStateOf(ModerationApplyScreenState())
        private set

    init {
        checkCurrentStatus()
    }

    fun onEvent(event: ModerationApplyScreenEvent) {
        when (event) {
            is ModerationApplyScreenEvent.ApplyToModeration -> applyToModeration()
            is ModerationApplyScreenEvent.CheckCurrentStatus -> checkCurrentStatus()
        }
    }

    private fun checkCurrentStatus(){
        launchCatching(
            onSuccess = {
                screenState = screenState.copy(
                    isModerator = it
                )
            }
        ) {
            moderatorUseCase.getModeratorStatus()
        }
    }

    private fun applyToModeration() {
        launchCatching(
            onSuccess = {
                screenState = screenState.copy(
                    isApplied = true
                )
            },
            onError = {
                screenState = screenState.copy(
                    isApplied = false
                )
            }
        ) {
            moderatorUseCase.requestPromotion()
        }
    }
}