package com.bounswe.predictionpolls.extensions

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed

fun Modifier.clickableWithoutIndicator(
    onClick: () -> Unit
): Modifier = composed {
    val interactionSource = remember {
        MutableInteractionSource()
    }
    return@composed this.clickable(
        interactionSource = interactionSource,
        indication = null,
        onClick = onClick
    )
}