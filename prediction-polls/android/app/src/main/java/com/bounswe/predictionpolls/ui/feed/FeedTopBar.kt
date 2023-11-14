package com.bounswe.predictionpolls.ui.feed

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun FeedTopBar(
    notificationCount: Int,
    onMenuButtonClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .height(64.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Icon(
            painter = painterResource(id = R.drawable.ic_hamburger),
            contentDescription = "Menu icon",
            modifier = Modifier
                .padding(start = 16.dp)
                .size(48.dp)
                .clickable(onClick = onMenuButtonClicked)
        )

        NotificationDisplay(
            notificationCount = notificationCount,
            modifier = Modifier.padding(end = 16.dp)
        )

    }
}

// create a preview for FeedTopBar
@Preview(showBackground = true, showSystemUi = true)
@Composable
fun FeedTopBarPreview() {
    PredictionPollsTheme {
        FeedTopBar(notificationCount = 1, onMenuButtonClicked = {})
    }
}

