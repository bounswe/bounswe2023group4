package com.bounswe.predictionpolls

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController
import com.bounswe.predictionpolls.ui.feed.FEED_ROUTE
import com.bounswe.predictionpolls.ui.feed.feedScreen
import com.bounswe.predictionpolls.ui.leaderboard.leaderboardScreen
import com.bounswe.predictionpolls.ui.login.loginScreen
import com.bounswe.predictionpolls.ui.main.MAIN_ROUTE
import com.bounswe.predictionpolls.ui.main.mainScreen
import com.bounswe.predictionpolls.ui.signup.signupScreen
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PredictionPollsTheme {
                val navController = rememberNavController()
                NavHost(navController = navController, startDestination = FEED_ROUTE) {
                    mainScreen(navController)
                    loginScreen(navController)
                    signupScreen(navController)
                    feedScreen(navController)
                    leaderboardScreen(navController)
                }
            }
        }
    }
}