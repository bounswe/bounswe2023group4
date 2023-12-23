package com.bounswe.predictionpolls.ui.forgotPassword

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun ForgotPasswordScreen(
    email: String,
    onEmailChanged: (String) -> Unit,
    onSendResetLinkPressed: () -> Unit,
    onBackToLoginPressed: () -> Unit,
    modifier: Modifier = Modifier
) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Color.White),
        verticalArrangement = Arrangement.Top,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        item {

                Image(
                    painter = painterResource(id = R.drawable.ic_app_title),
                    contentDescription = "App Title",
                    modifier = Modifier
                        .padding(32.dp)
                        .wrapContentHeight()
                        .fillMaxWidth(),
                    contentScale = ContentScale.FillWidth
                )

        }

        item {
            Text(
                text = "Reset Your Password",
                modifier = Modifier.padding(16.dp),
                fontWeight = FontWeight.Bold,
                fontFamily = MontserratFontFamily,
                fontSize = 30.sp,
                textAlign = TextAlign.Center
            )

            Text(
                text = "Enter your email address below and we'll send you a link to reset your password.",
                modifier = Modifier.padding(16.dp),
                fontWeight = FontWeight.Normal,
                fontFamily = MontserratFontFamily,
                fontSize = 16.sp,
                textAlign = TextAlign.Center
            )

            TextField(
                value = email,
                onValueChange = onEmailChanged,
                label = { Text(text = "Email") },
                modifier = Modifier.padding(16.dp)
            )

            Button(onClick = onSendResetLinkPressed, modifier = Modifier.padding(16.dp)) {
                Text(text = "Send Reset Link")
            }

            Text(
                text = "Back to Login",
                color = MaterialTheme.colorScheme.primary,
                fontFamily = MontserratFontFamily,
                fontSize = 16.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.clickable(onClick = onBackToLoginPressed)
            )


        }

    }

}


// Create preview for ForgotPasswordScreen composable
@Preview
@Composable
fun ForgotPasswordScreenPreview() {
    PredictionPollsTheme {
        ForgotPasswordScreen(
            email = "",
            onEmailChanged = {},
            onSendResetLinkPressed = {},
            onBackToLoginPressed = {})
    }
}