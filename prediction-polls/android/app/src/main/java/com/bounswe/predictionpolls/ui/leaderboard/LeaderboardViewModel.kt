package com.bounswe.predictionpolls.ui.leaderboard

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.data.remote.repositories.LeaderboardRepositoryInterface
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class LeaderboardViewModel @Inject constructor(
    private val leaderboardRepository: LeaderboardRepositoryInterface
) : BaseViewModel() {
    var screenState by mutableStateOf(LeaderboardScreenState())
        private set

    init {
        fetchLeaderboard()
    }

    fun onEvent(event: LeaderboardScreenEvent) {
        screenState = screenState.reduce(event)
        when(event){
            is LeaderboardScreenEvent.OnTagSelected -> fetchLeaderboard()
        }
    }

    private fun fetchLeaderboard() {
        launchCatching(
            onSuccess = {
                screenState = screenState.copy(leaderboardList = it.userList)
            }
        ) {
            leaderboardRepository.getLeaderboard(screenState.selectedTag)
        }
    }
}