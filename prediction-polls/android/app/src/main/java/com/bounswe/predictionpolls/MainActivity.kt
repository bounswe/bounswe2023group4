package com.bounswe.predictionpolls

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavOptions
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.ui.common.CommonAppbar
import com.bounswe.predictionpolls.ui.common.NavigationDrawer
import com.bounswe.predictionpolls.ui.create.createPollScreen
import com.bounswe.predictionpolls.ui.editProfile.editProfileScreen
import com.bounswe.predictionpolls.ui.feed.feedScreen
import com.bounswe.predictionpolls.ui.forgotPassword.forgotPasswordScreen
import com.bounswe.predictionpolls.ui.leaderboard.leaderboardScreen
import com.bounswe.predictionpolls.ui.login.loginScreen
import com.bounswe.predictionpolls.ui.main.MAIN_ROUTE
import com.bounswe.predictionpolls.ui.main.mainScreen
import com.bounswe.predictionpolls.ui.main.navigateToMainScreen
import com.bounswe.predictionpolls.ui.moderation.apply.moderationApplyScreen
import com.bounswe.predictionpolls.ui.moderation.list.MODERATION_ROUTE
import com.bounswe.predictionpolls.ui.moderation.list.moderationScreen
import com.bounswe.predictionpolls.ui.moderation.vote.moderationVoteScreen
import com.bounswe.predictionpolls.ui.profile.myProfileScreen
import com.bounswe.predictionpolls.ui.profile.profileScreen
import com.bounswe.predictionpolls.ui.signup.signupScreen
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import com.bounswe.predictionpolls.ui.vote.pollVoteScreen
import com.bounswe.predictionpolls.utils.NavItem
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

val EXTRA_ROUTES_WITH_DRAWER = listOf(
    MODERATION_ROUTE,
)

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    @Inject
    lateinit var tokenManager: TokenManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PredictionPollsTheme {
                val navController = rememberNavController()
                val routesWithDrawer = remember {
                    NavItem.entries.map { it.route }.toSet().union(
                        EXTRA_ROUTES_WITH_DRAWER
                    )
                }
                val currentBackStack = navController.currentBackStackEntryAsState()
                val currentRoute = rememberUpdatedState(currentBackStack.value?.destination?.route)
                val isUserLoggedIn = tokenManager.isLoggedIn.collectAsState(initial = false)
                val context = LocalContext.current
                val loginRequiredText = stringResource(R.string.login_required_notification)
                val logoutSuccessText = stringResource(R.string.logged_out_notification)

                NavigationDrawer(
                    selectedRoute = currentRoute.value,
                    onButtonClick = {
                        if (it.requiresAuth && !isUserLoggedIn.value) {
                            Toast.makeText(context, loginRequiredText, Toast.LENGTH_SHORT).show()
                            navController.navigateToMainScreen(
                                navOptions = NavOptions.Builder().setPopUpTo(MAIN_ROUTE, true)
                                    .build()
                            )
                        } else {
                            navController.navigate(it.route)
                        }
                    },
                    isSignedIn = isUserLoggedIn.value,
                    onAuthButtonClick = {
                        if (isUserLoggedIn.value) {
                            tokenManager.clear()
                            Toast.makeText(context, logoutSuccessText, Toast.LENGTH_SHORT).show()
                            navController.navigateToMainScreen(
                                navOptions = NavOptions.Builder().setPopUpTo(MAIN_ROUTE, true)
                                    .build()
                            )
                        } else {
                            navController.navigateToMainScreen(
                                navOptions = NavOptions.Builder().setPopUpTo(MAIN_ROUTE, true)
                                    .build()
                            )
                        }
                    }
                ) { toggleDrawerState ->
                    Column {
                        CommonAppbar(
                            isVisible = currentRoute.value in routesWithDrawer,
                            onMenuClick = { toggleDrawerState() },
                        )

                        NavHost(navController = navController, startDestination = MAIN_ROUTE) {
                            mainScreen(navController)
                            loginScreen(navController)
                            signupScreen(navController)
                            feedScreen(navController, isUserLoggedIn.value)
                            leaderboardScreen(navController)
                            createPollScreen()
                            profileScreen(navController)
                            pollVoteScreen(navController)
                            myProfileScreen(navController)
                            editProfileScreen(navController)
                            forgotPasswordScreen(navController)
                            moderationApplyScreen(navController)
                            moderationScreen(navController)
                            moderationVoteScreen(navController)
                        }
                    }
                }
            }
        }
    }
}