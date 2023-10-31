package com.bounswe.predictionpolls.utils

import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.input.TransformedText
import org.junit.Assert.assertEquals
import org.junit.Test


class DateTransformationTest {
    private val dateTransformation = DateTransformation()

    @Test
    fun dateTransformation_filter_appliesCorrectTransformation() {
        val input = AnnotatedString("12345678")
        val result: TransformedText = dateTransformation.filter(input)
        val expected = AnnotatedString("12/34/5678")
        assertEquals(expected, result.text)
    }

    @Test
    fun dateFilter_handlesShortText() {
        val input = AnnotatedString("123")
        val result: TransformedText = dateFilter(input)
        val expected = AnnotatedString("12/3")
        assertEquals(expected, result.text)
    }

    @Test
    fun dateFilter_handleLongText(){
        val input = AnnotatedString("1234567890")
        val result: TransformedText = dateFilter(input)
        val expected = AnnotatedString("12/34/5678")
        assertEquals(expected, result.text)
    }
}