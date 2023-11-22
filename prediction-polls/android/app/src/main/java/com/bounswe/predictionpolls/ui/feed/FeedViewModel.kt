package com.bounswe.predictionpolls.ui.feed

import androidx.lifecycle.ViewModel
import com.bounswe.predictionpolls.domain.feed.GetFeedUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class FeedViewModel @Inject constructor(private val getFeedUseCase: GetFeedUseCase) : ViewModel() {

}