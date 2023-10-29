package com.bounswe.predictionpolls

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.navigation.NavController
import androidx.navigation.NavOptions
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController
import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.ui.feed.feedScreen
import com.bounswe.predictionpolls.ui.feed.navigateToFeedScreen
import com.bounswe.predictionpolls.ui.login.loginScreen
import com.bounswe.predictionpolls.ui.main.MAIN_ROUTE
import com.bounswe.predictionpolls.ui.main.mainScreen
import com.bounswe.predictionpolls.ui.signup.signupScreen
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    @Inject
    lateinit var tokenManager: TokenManager
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PredictionPollsTheme {
                val navController = rememberNavController()
                NavigateToFeedIfLoggedIn(navController = navController)
                NavHost(navController = navController, startDestination = MAIN_ROUTE) {
                    mainScreen(navController)
                    loginScreen(navController)
                    signupScreen(navController)
                    feedScreen()
                }
            }
        }
    }

    @Composable
    fun NavigateToFeedIfLoggedIn(navController: NavController) {
        SideEffect {
            if (tokenManager.isLoggedIn) {
                navController.navigateToFeedScreen(
                    navOptions = NavOptions.Builder().setPopUpTo(MAIN_ROUTE, true).build()
                )
            }
        }
    }
}