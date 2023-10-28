package com.bounswe.predictionpolls.ui.common.poll

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

private val DiscreteVoteOptionShape = RoundedCornerShape(12.dp)

/**
 * Composable representing the discrete options in a vote.
 * @param optionName Name of the option.
 * @param voteCount Number of votes for this option.
 * @param fillPercentage Percentage of the bar that should be filled.
 * @param modifier Modifier for styling.
 * @param optionPrefix Prefix for the option name. For example, "A)" for option "A) Golden State Warriors".
 * @param isSelected Whether this option is selected or not.
 */
@Composable
fun DiscreteVoteOption(
    optionName: String,
    voteCount: Int,
    fillPercentage: Float,
    isSelected: Boolean,
    modifier: Modifier = Modifier,
    optionPrefix: String? = null
) {
    val optionText = remember(optionPrefix, optionName) {
        if (optionPrefix != null) {
            "$optionPrefix $optionName"
        } else {
            optionName
        }
    }
    Box(
        modifier = modifier
            .clip(DiscreteVoteOptionShape)
            .border(
                2.dp,
                MaterialTheme.colorScheme.secondary.copy(alpha = if (isSelected) 1f else 0.5f),
                DiscreteVoteOptionShape
            )
            .background(MaterialTheme.colorScheme.background)
            .aspectRatio(6f)
            .fillMaxWidth()
    ) {
        DiscreteVoteProgress(
            fillPercentage = fillPercentage,
            modifier = Modifier
                .alpha(if (isSelected) 1f else 0.5f)
        )
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxSize()
        ) {
            Spacer(modifier = Modifier.width(16.dp))
            OptionTextComposable(
                optionText,
                modifier = Modifier.weight(1f),
            )
            Text(
                voteCount.toString(),
                fontFamily = MontserratFontFamily,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.scrim,
                modifier = Modifier.padding(horizontal = 16.dp)
            )
        }
    }

}

@Composable
private fun OptionTextComposable(optionText: String, modifier: Modifier = Modifier) {
    Text(
        optionText,
        fontFamily = MontserratFontFamily,
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.scrim,
        textAlign = TextAlign.Start,
        modifier = modifier,
        overflow = TextOverflow.Ellipsis
    )
}

@Composable
private fun DiscreteVoteProgress(fillPercentage: Float, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .alpha(0.5f)
            .fillMaxWidth(fillPercentage)
            .fillMaxHeight()
            .background(MaterialTheme.colorScheme.secondary)
    )

}

@Preview(showBackground = true, showSystemUi = true)
@Composable
fun DiscreteVoteOptionPreview() {
    PredictionPollsTheme(dynamicColor = false) {
        DiscreteVoteOption(
            optionName = "Golden State Warriors",
            voteCount = 138,
            fillPercentage = 0.5f,
            optionPrefix = "A)",
            isSelected = false,
            modifier = Modifier.padding(16.dp)
        )
    }
}