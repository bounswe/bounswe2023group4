package com.bounswe.predictionpolls

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.profile.GetCurrentUserProfileUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject


data class MainActivityState(val points: Int? = null)

@HiltViewModel
class MainActivityViewModel @Inject constructor(private val fetchCurrentUserProfileUseCase: GetCurrentUserProfileUseCase) :
    ViewModel() {


    private val _state = MutableStateFlow(MainActivityState())
    val state = _state.asStateFlow()


    init {
        viewModelScope.launch(Dispatchers.IO) {
            fetchCurrentUserProfile()
        }
    }



     suspend fun fetchCurrentUserProfile() {
        when (val result = fetchCurrentUserProfileUseCase()) {
            is Result.Success -> {
                val profileInfo = result.data
                _state.update {
                    it.copy(points = profileInfo.points)
                }
            }

            is Result.Error -> {
                // handle error
            }
        }
    }
}