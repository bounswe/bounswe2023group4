package com.bounswe.predictionpolls.ui.main

import androidx.annotation.StringRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.feed.navigateToFeedScreen
import com.bounswe.predictionpolls.ui.login.navigateToLoginScreen
import com.bounswe.predictionpolls.ui.signup.navigateToSignupScreen
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme


@Composable
fun MainScreen(modifier: Modifier = Modifier, navController: NavController) {
    MainScreenUI(
        modifier = modifier,
        onLoginClick = {
            navController.navigateToLoginScreen()
        },
        onSignUpClick = {
            navController.navigateToSignupScreen()
        },
        onContinueWithoutLoginClick = {
            navController.navigateToFeedScreen()
        }
    )
}

@Composable
private fun MainScreenUI(
    modifier: Modifier = Modifier,
    onLoginClick: () -> Unit = {},
    onSignUpClick: () -> Unit = {},
    onContinueWithoutLoginClick: () -> Unit = {},
) {
    val mainScreenBackground = Brush.verticalGradient(
        colors = listOf(
            MaterialTheme.colorScheme.onPrimary,
            MaterialTheme.colorScheme.primaryContainer,
            MaterialTheme.colorScheme.primaryContainer,
        )
    )

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(mainScreenBackground)
            .padding(top = 96.dp, bottom = 60.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        AppTitle()
        Spacer(modifier = Modifier.height(32.dp))
        AppName()
        Spacer(modifier = Modifier.weight(1f))
        AppImage()
        Spacer(modifier = Modifier.weight(1f))
        ActionButtons(
            onLoginClick = onLoginClick,
            onSignUpClick = onSignUpClick,
            onContinueWithoutLoginClick = onContinueWithoutLoginClick
        )
    }
}

@Composable
private fun AppTitle() {
    Text(
        text = stringResource(R.string.welcome_page_title),
        style = MaterialTheme.typography.headlineMedium,
        fontSize = 20.sp,
        lineHeight = 22.sp,
        fontWeight = FontWeight.Medium,
        color = MaterialTheme.colorScheme.primary,
    )
}

@Composable
private fun AppName() {
    Image(
        modifier = Modifier
            .fillMaxWidth(0.8f)
            .height(48.dp),
        alignment = Alignment.Center,
        painter = painterResource(id = R.drawable.ic_app_title),
        contentDescription = stringResource(R.string.cd_app_title)
    )
}

@Composable
private fun AppImage() {
    Image(
        modifier = Modifier
            .size(300.dp),
        alignment = Alignment.Center,
        painter = painterResource(id = R.drawable.ic_welcome_page),
        contentDescription = stringResource(R.string.cd_welcome_page_image)
    )
}

@Composable
private fun ActionButtons(
    onLoginClick: () -> Unit = {},
    onSignUpClick: () -> Unit = {},
    onContinueWithoutLoginClick: () -> Unit = {},
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        MainScreenActionButton(
            titleId = R.string.welcome_page_login,
            backgroundColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            onClick = onLoginClick
        )
        Spacer(modifier = Modifier.height(24.dp))
        MainScreenActionButton(
            titleId = R.string.welcome_page_signup,
            backgroundColor = MaterialTheme.colorScheme.onPrimary,
            contentColor = MaterialTheme.colorScheme.primary,
            onClick = onSignUpClick
        )
        Spacer(modifier = Modifier.height(12.dp))
        ContinueWithoutLoginButton(
            onClick = onContinueWithoutLoginClick
        )
    }
}

@Composable
private fun MainScreenActionButton(
    @StringRes titleId: Int,
    backgroundColor: Color,
    contentColor: Color,
    onClick: () -> Unit = {}
) {
    val shape = MaterialTheme.shapes.medium

    Text(
        modifier = Modifier
            .fillMaxWidth()
            .background(backgroundColor, shape)
            .clip(shape = shape)
            .clickable {
                onClick()
            }
            .padding(vertical = 12.dp),
        text = stringResource(id = titleId),
        style = MaterialTheme.typography.labelMedium,
        fontSize = 14.sp,
        lineHeight = 22.sp,
        fontWeight = FontWeight.Medium,
        color = contentColor,
        textAlign = TextAlign.Center,
    )
}

@Composable
private fun ContinueWithoutLoginButton(
    onClick: () -> Unit = {}
) {
    Text(
        modifier = Modifier
            .clickable {
                onClick()
            }
            .padding(vertical = 8.dp),
        text = stringResource(id = R.string.welcome_page_continue_without_login),
        style = MaterialTheme.typography.labelMedium,
        fontSize = 12.sp,
        lineHeight = 20.sp,
        fontWeight = FontWeight.Medium,
        color = MaterialTheme.colorScheme.primary,
        textAlign = TextAlign.Center,
        textDecoration = TextDecoration.Underline
    )
}

@Preview
@Composable
fun MainScreenPreview() {
    PredictionPollsTheme {
        MainScreenUI()
    }
}