package com.bounswe.predictionpolls.ui.common

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.bounswe.predictionpolls.R

@Composable
fun CommonAppbar(
    isVisible: Boolean = true,
    onMenuClick: () -> Unit = {},
    onNotificationClick: () -> Unit = {},
) {
    if (!isVisible) return

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        IconButton(
            onClick = {
                onMenuClick()
            },
        ) {
            Icon(
                painter = painterResource(id = R.drawable.ic_hamburger),
                contentDescription = null,
                modifier = Modifier.size(40.dp)
            )
        }
        IconButton(
            onClick = {
                onNotificationClick()
            },
        ) {
            Icon(
                painter = painterResource(id = R.drawable.ic_notification),
                contentDescription = null,
                modifier = Modifier.size(40.dp)
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun CommonAppbarPreview() {
    CommonAppbar()
}