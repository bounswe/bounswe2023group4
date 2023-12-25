package com.bounswe.predictionpolls.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
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
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily

@Composable
fun CommonAppbar(
    isVisible: Boolean = true,
    onMenuClick: () -> Unit = {},
    points: Int? = null
) {
    if (!isVisible) return

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 8.dp),
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
                contentDescription = stringResource(id = R.string.cd_menu),
                modifier = Modifier.size(32.dp)
            )
        }
        Spacer(modifier = Modifier.weight(1f))
        if (points != null) {
            PointsDisplay(points = points)
        }
    }
}

@Composable
fun PointsDisplay(points: Int) {
    Text(
        text = "$points GP",
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(MaterialTheme.colorScheme.primary)
            .padding(vertical = 6.dp, horizontal = 12.dp),
        fontFamily = MontserratFontFamily,
        fontSize = 16.sp,
        color = Color.White,
        fontWeight = FontWeight.SemiBold
    )
}

@Preview
@Composable
private fun PointsDisplayPreview() {
    Box {
        PointsDisplay(points = 100)
    }
}

@Preview(showBackground = true)
@Composable
private fun CommonAppbarPreview() {
    CommonAppbar(points = 100)
}