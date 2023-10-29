package com.bounswe.predictionpolls.ui.feed

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.hilt.navigation.compose.hiltViewModel

@Composable
fun FeedScreen(
    viewModel: FeedViewModel = hiltViewModel()
) {
    Column {
        Text(text ="Feed Screen")
        Text(text =" Access token: ${viewModel.tokenManager.accessToken}\n Refresh token: ${viewModel.tokenManager.refreshToken}")
    }
}