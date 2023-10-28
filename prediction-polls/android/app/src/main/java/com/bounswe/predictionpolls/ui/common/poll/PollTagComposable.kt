package com.bounswe.predictionpolls.ui.common.poll

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

private val TagShape = RoundedCornerShape(12.dp)

@Composable
fun PollTagComposable(tagName: String, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clip(TagShape)
            .size(120.dp, 40.dp)
            .background(MaterialTheme.colorScheme.secondary)
    ) {
        Text(
            text = tagName,
            modifier = Modifier.align(Alignment.Center),
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.Bold,
            fontSize = 14.sp,
            color = Color.White,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            textAlign = TextAlign.Center
        )
    }
}


// create a preview for above composable
@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun PollTagComposablePreview() {
    PredictionPollsTheme(dynamicColor = false) {
        PollTagComposable(tagName = "Android")
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun PollTagComposableDarkPreview() {
    PredictionPollsTheme(dynamicColor = false, darkTheme = true) {
        PollTagComposable(tagName = "Android")
    }
}