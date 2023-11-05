package com.bounswe.predictionpolls.extensions

import androidx.compose.ui.text.intl.Locale as ComposeLocale
import java.util.Locale as JavaLocale
import java.text.SimpleDateFormat
import java.util.Date
import junit.framework.TestCase.assertEquals
import org.junit.Test

class LongExtensionTest {
    @Test
    fun testToTimeDateString() {
        val timestamp = 1633046400000L
        val locale = ComposeLocale("en")
        val formattedDate = timestamp.toTimeDateString(locale)
        val javaLocale = JavaLocale(locale.language, locale.region)
        val expectedDate = SimpleDateFormat("ddMMyyyy", javaLocale).format(Date(timestamp))
        assertEquals(expectedDate, formattedDate)
    }
}