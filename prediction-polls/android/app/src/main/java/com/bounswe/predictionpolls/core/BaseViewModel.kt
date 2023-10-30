package com.bounswe.predictionpolls.core

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch

abstract class BaseViewModel : ViewModel() {
    companion object {
        private const val MAX_RETRY_COUNT = 3
    }

    var trackedActiveJobCount by mutableStateOf(0)
    var error by mutableStateOf<String?>(null)

    val isLoading: Boolean
        get() = trackedActiveJobCount > 0

    val hasError: Boolean
        get() = error != null

    fun <T> launchCatching(
        scope: CoroutineScope = viewModelScope,
        trackJobProgress: Boolean = false,
        maxRetryCount: Int = MAX_RETRY_COUNT,
        onSuccess: ((T) -> Unit)? = null,
        errorFilter: ((Throwable) -> Boolean)? = null,
        onError: ((Throwable?) -> Unit)? = null,
        block: suspend () -> T
    ) {
        var retryCount = 0

        scope.launch {
            while (retryCount < maxRetryCount) {
                kotlin.runCatching {
                    if (trackJobProgress && retryCount == 0) {
                        trackedActiveJobCount++
                    }
                    block()
                }.onFailure {
                    retryCount++
                    if (retryCount == maxRetryCount) {
                        if (trackJobProgress) {
                            trackedActiveJobCount--
                        }
                        if (errorFilter?.invoke(it) != false) {
                            error = it.message
                            onError?.invoke(it)
                        }
                    }
                }.onSuccess {
                    if (trackJobProgress) {
                        trackedActiveJobCount--
                    }
                    onSuccess?.invoke(it)
                    return@launch
                }
            }
        }
    }
}