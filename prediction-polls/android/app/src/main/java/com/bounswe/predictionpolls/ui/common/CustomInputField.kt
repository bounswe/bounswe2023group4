package com.bounswe.predictionpolls.ui.common

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import com.bounswe.predictionpolls.utils.DateTransformation

@Composable
fun CustomInputField(
    modifier: Modifier = Modifier,
    borderColor: Color = MaterialTheme.colorScheme.onBackground,
    backgroundColor: Color = MaterialTheme.colorScheme.background,
    @StringRes labelId: Int? = null,
    text: String = "",
    onTextChanged: (String) -> Unit = {},
    isError: Boolean = false,
    shape: Shape = MaterialTheme.shapes.medium,
    @DrawableRes trailingIconId: Int? = null,
    @StringRes trailingIconContentDescription: Int? = null,
    onTrailingIconClicked: () -> Unit = {},
    keyboardActions: KeyboardActions = KeyboardActions.Default,
    keyboardOptions: KeyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Text
    ),
    visualTransformation: VisualTransformation = VisualTransformation.None,
) {
    TextField(
        modifier = modifier.border(1.dp, borderColor.copy(alpha = 0.2f), shape),
        value = text,
        onValueChange = onTextChanged,
        label = {
            CustomInputFieldText(
                labelId = labelId,
                color = borderColor,
            )
        },
        colors = TextFieldDefaults.colors(
            errorTextColor = MaterialTheme.colorScheme.error,
            focusedTextColor = borderColor,
            unfocusedTextColor = borderColor,
            unfocusedContainerColor = backgroundColor,
            focusedContainerColor = backgroundColor,
            unfocusedIndicatorColor = Color.Transparent,
            focusedIndicatorColor = Color.Transparent,
            disabledIndicatorColor = Color.Transparent,
            errorIndicatorColor = Color.Transparent
        ),
        isError = isError,
        shape = shape,
        textStyle = MaterialTheme.typography.bodyMedium.copy(
            fontSize = 14.sp,
            textDecoration = TextDecoration.None
        ),
        trailingIcon = {
            CustomInputFieldTrailingIcon(
                trailingIconId = trailingIconId,
                trailingIconContentDescription = trailingIconContentDescription,
                onTrailingIconClicked = onTrailingIconClicked,
            )
        },
        keyboardActions = keyboardActions,
        keyboardOptions = keyboardOptions,
        visualTransformation = visualTransformation,
    )
}

@Composable
fun CustomInputFieldText(
    @StringRes labelId: Int? = null,
    color: Color = MaterialTheme.colorScheme.onBackground,
) {
    if (labelId == null) return
    Text(
        text = stringResource(id = labelId),
        color = color,
    )
}

@Composable
fun CustomInputFieldTrailingIcon(
    @DrawableRes trailingIconId: Int? = null,
    @StringRes trailingIconContentDescription: Int? = null,
    onTrailingIconClicked: () -> Unit = {},
) {
    if (trailingIconId == null || trailingIconContentDescription == null) return

    Icon(
        painter = painterResource(id = trailingIconId),
        contentDescription = stringResource(id = trailingIconContentDescription),
        modifier = Modifier.clickable {
            onTrailingIconClicked()
        }
    )
}


@Preview
@Composable
fun CustomInputFieldPreview() {
    PredictionPollsTheme {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.background),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            CustomInputField(
                modifier = Modifier.fillMaxWidth(0.8f),
                text = "example@outlook.com",
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Email
                )
            )
            CustomInputField(
                text = "exampleUsername"
            )
            CustomInputField(
                text = "passssworddd",
                trailingIconId = R.drawable.ic_visibile,
                trailingIconContentDescription = R.string.cd_visible,
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Password
                ),
                visualTransformation = PasswordVisualTransformation()
            )
            CustomInputField(
                text = "105123",
                trailingIconId = R.drawable.ic_calendar,
                trailingIconContentDescription = R.string.cd_calendar,
                visualTransformation = DateTransformation(),
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Number
                )
            )
        }
    }
}