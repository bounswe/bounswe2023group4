package com.bounswe.predictionpolls.ui.common.poll

import androidx.compose.ui.text.input.KeyboardType

enum class ContinuousVoteInputType {
    /**
     * Vote type for continuous votes that are represented by an integer number.
     */
    Number,

    /**
     * Vote type for continuous votes that are represented by a floating number.
     */
    Decimal,

    /**
     * Vote type for continuous votes that are represented by a date.
     */
    Date,

    /**
     * Vote type for continuous votes that are represented by a string.
     */
    Text
}

fun ContinuousVoteInputType.toKeyboardType(): KeyboardType {
    return when (this) {
        ContinuousVoteInputType.Number -> KeyboardType.Number
        ContinuousVoteInputType.Decimal -> KeyboardType.Decimal
        ContinuousVoteInputType.Date, ContinuousVoteInputType.Text -> KeyboardType.Text
    }
}