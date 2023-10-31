package com.bounswe.predictionpolls.ui.main

import androidx.lifecycle.ViewModel
import com.bounswe.predictionpolls.data.remote.TokenManager
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class MainScreenViewModel @Inject constructor(
    val tokenManager: TokenManager
): ViewModel()