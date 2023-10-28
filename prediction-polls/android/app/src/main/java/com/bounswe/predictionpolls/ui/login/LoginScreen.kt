package com.bounswe.predictionpolls.ui.login

import androidx.activity.compose.LocalOnBackPressedDispatcherOwner
import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.common.CustomInputField
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun LoginScreen(
    viewModel: LoginScreenViewModel = hiltViewModel()
) {
    val dispatcher = LocalOnBackPressedDispatcherOwner.current?.onBackPressedDispatcher

    LoginScreenUI(
        onBackButtonClicked = { dispatcher?.onBackPressed() },
        email = viewModel.screenState.email,
        onEmailChanged = { viewModel.onEvent(LoginScreenEvent.OnEmailChanged(it)) },
        password = viewModel.screenState.password,
        onPasswordChanged = { viewModel.onEvent(LoginScreenEvent.OnPasswordChanged(it)) },
        onPasswordVisibilityClicked = { viewModel.onEvent(LoginScreenEvent.OnPasswordVisibilityToggleClicked) },
        isPasswordVisible = viewModel.screenState.isPasswordVisible,
        onLoginClicked = { viewModel.onEvent(LoginScreenEvent.OnLoginButtonClicked) },
        isLoginEnabled = viewModel.screenState.isLoginButtonEnabled,
        onLoginWithGoogleClicked = { viewModel.onEvent(LoginScreenEvent.OnLoginWithGoogleButtonClicked) }
    )
}

@Composable
fun LoginScreenUI(
    onBackButtonClicked: () -> Unit = {},
    email: String = "",
    onEmailChanged: (String) -> Unit = {},
    password: String = "",
    onPasswordChanged: (String) -> Unit = {},
    onPasswordVisibilityClicked: () -> Unit = {},
    isPasswordVisible: Boolean = false,
    onLoginClicked: () -> Unit = {},
    isLoginEnabled: Boolean = false,
    onLoginWithGoogleClicked: () -> Unit = {}
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 32.dp, bottom = 60.dp, start = 16.dp, end = 16.dp)
    ) {
        LoginScreenHeader(
            onBackButtonClicked = onBackButtonClicked
        )
        Spacer(modifier = Modifier.height(60.dp))
        LoginScreenForm(
            email = email,
            onEmailChanged = onEmailChanged,
            password = password,
            onPasswordChanged = onPasswordChanged,
            onPasswordVisibilityClicked = onPasswordVisibilityClicked,
            isPasswordVisible = isPasswordVisible
        )
        Spacer(modifier = Modifier.weight(1f))
        LoginScreenActionButtons(
            isLoginEnabled = isLoginEnabled,
            onLoginClicked = onLoginClicked,
            onGoogleLoginClicked = onLoginWithGoogleClicked
        )
    }
}

@Composable
fun LoginScreenHeader(
    onBackButtonClicked: () -> Unit = {}
) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        IconButton(
            onClick = { onBackButtonClicked() }
        ) {
            Icon(
                painter = painterResource(id = R.drawable.ic_back),
                contentDescription = stringResource(id = R.string.cd_back),
                tint = MaterialTheme.colorScheme.primary,
            )
        }
        Text(
            text = stringResource(id = R.string.login_page_title),
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 20.sp,
            lineHeight = 24.sp
        )
    }
}

@Composable
fun LoginScreenForm(
    email: String = "",
    onEmailChanged: (String) -> Unit = {},
    password: String = "",
    onPasswordChanged: (String) -> Unit = {},
    onPasswordVisibilityClicked: () -> Unit = {},
    isPasswordVisible: Boolean = false,
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        CustomInputField(
            modifier = Modifier.fillMaxWidth(),
            labelId = R.string.login_email_label,
            text = email,
            onTextChanged = onEmailChanged,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email
            )
        )
        CustomInputField(
            modifier = Modifier.fillMaxWidth(),
            labelId = R.string.login_password_label,
            text = password,
            onTextChanged = onPasswordChanged,
            trailingIconId = R.drawable.ic_visibile,
            trailingIconContentDescription = R.string.cd_visible,
            onTrailingIconClicked = onPasswordVisibilityClicked,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Password
            ),
            visualTransformation = if (isPasswordVisible) VisualTransformation.None else PasswordVisualTransformation()
        )
    }
}

@Composable
fun LoginScreenActionButtons(
    isLoginEnabled: Boolean = false,
    onLoginClicked: () -> Unit = {},
    onGoogleLoginClicked: () -> Unit = {},
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(24.dp),
    ) {
        LoginScreenActionButton(
            isEnabled = isLoginEnabled,
            titleId = R.string.login_button,
            backgroundColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            onClick = onLoginClicked
        )
        ActionButtonDivider()
        LoginScreenActionButton(
            leadingIconId = R.drawable.ic_google,
            leadIconContentDescription = R.string.cd_login_with_google_button,
            titleId = R.string.login_with_google_button,
            backgroundColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            onClick = onGoogleLoginClicked
        )
    }
}

@Composable
private fun ActionButtonDivider() {
    Row(
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Divider(
            modifier = Modifier
                .weight(1f),
            color = MaterialTheme.colorScheme.primary
        )
        Text(
            text = stringResource(id = R.string.or),
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(horizontal = 16.dp),
        )
        Divider(
            modifier = Modifier
                .weight(1f),
            color = MaterialTheme.colorScheme.primary
        )
    }
}

@Composable
private fun LoginScreenActionButton(
    @DrawableRes leadingIconId: Int? = null,
    @StringRes leadIconContentDescription: Int? = null,
    @StringRes titleId: Int,
    backgroundColor: Color,
    contentColor: Color,
    isEnabled: Boolean = true,
    onClick: () -> Unit = {},
) {
    val shape = MaterialTheme.shapes.medium

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(backgroundColor, shape)
            .clip(shape = shape)
            .clickable(
                enabled = isEnabled,
            ) {
                onClick()
            }
            .padding(vertical = 18.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center
    ) {
        leadingIconId?.let {
            Icon(
                painter = painterResource(id = it),
                contentDescription = stringResource(id = leadIconContentDescription!!),
                tint = contentColor,
            )
            Spacer(modifier = Modifier.width(12.dp))
        }
        Text(
            text = stringResource(id = titleId),
            style = MaterialTheme.typography.labelMedium,
            fontSize = 14.sp,
            lineHeight = 22.sp,
            fontWeight = FontWeight.Medium,
            color = contentColor,
            textAlign = TextAlign.Center,
        )
    }
}

@Preview
@Composable
fun LoginScreenPreview() {
    PredictionPollsTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.background)
        ) {
            LoginScreenUI()
        }
    }
}
