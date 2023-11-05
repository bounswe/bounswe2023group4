package com.bounswe.predictionpolls.ui.feed

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun NotificationDisplay(notificationCount: Int, modifier: Modifier = Modifier) {
    Box(modifier = modifier) {
        Icon(
            painter = painterResource(id = R.drawable.ic_notification),
            contentDescription = "Notification",
            modifier = Modifier
                .align(Alignment.Center)
                .size(48.dp)
        )
        if (notificationCount > 0) {
            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(MaterialTheme.colorScheme.primary)
                    .align(Alignment.TopEnd)
                    .size(24.dp)
            ) {
                Text(
                    text = "$notificationCount",
                    fontFamily = MontserratFontFamily,
                    fontSize = 16.sp,
                    color = Color.White,
                    modifier = Modifier.align(Alignment.Center)
                )
            }
        }
    }
}


// preview
@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun NotificationDisplayPreview() {
    PredictionPollsTheme(dynamicColor = false) {
        NotificationDisplay(1, modifier = Modifier.padding(48.dp))

    }
}