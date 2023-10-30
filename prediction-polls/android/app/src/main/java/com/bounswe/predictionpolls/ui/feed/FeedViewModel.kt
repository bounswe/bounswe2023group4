package com.bounswe.predictionpolls.ui.feed

import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class FeedViewModel @Inject constructor(
    val tokenManager: TokenManager,
    private val authRepository: AuthRepository
): BaseViewModel() {
    //TODO Demo function correct the logic when the feed is implemented
    fun logout(
        onSuccess: () -> Unit = {},
    ) {
        launchCatching(
            onSuccess = {
                onSuccess()
            }
        ) {
            authRepository.logout()
        }
    }
    fun clear(){
        tokenManager.clear()
    }
}