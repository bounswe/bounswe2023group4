package com.bounswe.predictionpolls.extensions

import androidx.compose.ui.text.intl.Locale as ComposeLocale
import java.util.Locale as JavaLocale
import java.text.SimpleDateFormat
import java.util.Date

fun Long.toTimeDateString(locale: ComposeLocale): String {
    val dateTime = Date(this)
    val javaLocale = JavaLocale(locale.language, locale.region)
    val format = SimpleDateFormat("ddMMyyyy", javaLocale)
    return format.format(dateTime)
}