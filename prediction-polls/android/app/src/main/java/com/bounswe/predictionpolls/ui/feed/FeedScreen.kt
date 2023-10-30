package com.bounswe.predictionpolls.ui.feed

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.bounswe.predictionpolls.ui.main.navigateToMainScreen

@Composable
fun FeedScreen(
    navController: NavController,
    viewModel: FeedViewModel = hiltViewModel()
) {
    val accessToken by viewModel.tokenManager.accessTokenFlow.collectAsState(initial = null)
    val refreshToken by viewModel.tokenManager.refreshTokenFlow.collectAsState(initial = null)

    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        Text(text = "Feed Screen")
        Text(text = "Access token: $accessToken\nRefresh token: $refreshToken")
        Button(
            onClick = {
                viewModel.logout(
                    onSuccess = {
                        navController.navigateToMainScreen()
                    }
                )
            }
        ) {
            Text(text = "Logout")
        }
        Button(
            onClick = {
                viewModel.clear()
            }
        ) {
            Text(text = "Clear Tokens")
        }
    }
}