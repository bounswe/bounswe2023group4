package com.bounswe.predictionpolls.ui.moderation

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.core.BaseViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class ModerationScreenViewModel @Inject constructor() : BaseViewModel() {
    var screenState by mutableStateOf(ModerationScreenState.DUMMY)
        private set

    fun onEvent(event: ModerationScreenEvent) {
        screenState = screenState.reduce(event)

        when (event) {
            else -> {}
        }
    }
}