package com.bounswe.predictionpolls.ui.signup

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
import androidx.compose.material3.Checkbox
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
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.common.CustomInputField
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import com.bounswe.predictionpolls.utils.DateTransformation

@Composable
fun SignupScreen() {
    SignupScreenUI()
}

@Composable
fun SignupScreenUI(
    email: String = "",
    onEmailChanged: (String) -> Unit = {},
    username: String = "",
    onUsernameChanged: (String) -> Unit = {},
    password: String = "",
    onPasswordChanged: (String) -> Unit = {},
    onPasswordVisibilityClicked: () -> Unit = {},
    isPasswordVisible: Boolean = false,
    birthday: String = "",
    onBirthdayChanged: (String) -> Unit = {},
    onDatePickerClicked: () -> Unit = {},
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 32.dp, bottom = 60.dp, start = 16.dp, end = 16.dp)
    ) {
        SignupScreenHeader()
        Spacer(modifier = Modifier.height(60.dp))
        SignupScreenForm(
            email = email,
            onEmailChanged = onEmailChanged,
            username = username,
            onUsernameChanged = onUsernameChanged,
            password = password,
            onPasswordChanged = onPasswordChanged,
            onPasswordVisibilityClicked = onPasswordVisibilityClicked,
            isPasswordVisible = isPasswordVisible,
            birthday = birthday,
            onBirthdayChanged = onBirthdayChanged,
            onDatePickerClicked = onDatePickerClicked,
        )
        Spacer(modifier = Modifier.height(12.dp))
        AgreementBox()
        Spacer(modifier = Modifier.weight(1f))
        SignupScreenActionButtons()
    }
}

@Composable
fun SignupScreenHeader(
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
            text = stringResource(id = R.string.signup_page_title),
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 20.sp,
            lineHeight = 24.sp
        )
    }
}

@Composable
fun SignupScreenForm(
    email: String = "",
    onEmailChanged: (String) -> Unit = {},
    username: String = "",
    onUsernameChanged: (String) -> Unit = {},
    password: String = "",
    onPasswordChanged: (String) -> Unit = {},
    onPasswordVisibilityClicked: () -> Unit = {},
    isPasswordVisible: Boolean = false,
    birthday: String = "",
    onBirthdayChanged: (String) -> Unit = {},
    onDatePickerClicked: () -> Unit = {},
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        CustomInputField(
            modifier = Modifier.fillMaxWidth(),
            labelId = R.string.signup_email_label,
            text = email,
            onTextChanged = onEmailChanged,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email
            )
        )
        CustomInputField(
            modifier = Modifier.fillMaxWidth(),
            labelId = R.string.signup_username_label,
            text = username,
            onTextChanged = onUsernameChanged,
        )
        CustomInputField(
            modifier = Modifier.fillMaxWidth(),
            labelId = R.string.signup_password_label,
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
        CustomInputField(
            modifier = Modifier.fillMaxWidth(),
            labelId = R.string.signup_birthday_label,
            text = birthday,
            onTextChanged = onBirthdayChanged,
            trailingIconId = R.drawable.ic_calendar,
            trailingIconContentDescription = R.string.cd_calendar,
            onTrailingIconClicked = onDatePickerClicked,
            visualTransformation = DateTransformation(),
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Number
            )
        )
    }
}

@Composable
fun AgreementBox(
    onCheckedChanged: (Boolean) -> Unit = {},
    isChecked: Boolean = false,
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Checkbox(
            checked = isChecked,
            onCheckedChange = onCheckedChanged
        )
        Text(
            text = stringResource(id = R.string.signup_agreement_text),
            color = MaterialTheme.colorScheme.onBackground,
            style = MaterialTheme.typography.bodyMedium,
            fontSize = 14.sp,
            lineHeight = 20.sp
        )
    }
}

@Composable
fun SignupScreenActionButtons(
    onSignUpClicked: () -> Unit = {},
    onGoogleSignUpClicked: () -> Unit = {},
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(24.dp),
    ) {
        SignupScreenActionButton(
            titleId = R.string.signup_button,
            backgroundColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            onClick = onSignUpClicked
        )
        ActionButtonDivider()
        SignupScreenActionButton(
            leadingIconId = R.drawable.ic_google,
            leadIconContentDescription = R.string.cd_signup_with_google_button,
            titleId = R.string.signup_with_google_button,
            backgroundColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            onClick = onGoogleSignUpClicked
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
private fun SignupScreenActionButton(
    @DrawableRes leadingIconId: Int? = null,
    @StringRes leadIconContentDescription: Int? = null,
    @StringRes titleId: Int,
    backgroundColor: Color,
    contentColor: Color,
    onClick: () -> Unit = {},
) {
    val shape = MaterialTheme.shapes.medium

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(backgroundColor, shape)
            .padding(vertical = 18.dp)
            .clickable {
                onClick()
            }
            .clip(shape = shape),
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
fun SignupScreenPreview() {
    PredictionPollsTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.background)
        ) {
            SignupScreenUI()
        }
    }
}
