package com.bounswe.predictionpolls.extensions

import android.os.Build
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.util.Locale

fun String.isValidEmail(): Boolean {
    val emailRegex = Regex(
        pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
        option = RegexOption.IGNORE_CASE
    )
    return emailRegex.matches(this)
}

fun String.isValidDate(): Boolean {
    if (this.length != 8) return false

    val year = this.substring(4, 8)
    val month = this.substring(2, 4)
    val day = this.substring(0, 2)

    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
        val dateString = "$day/$month/$year"
        val formatter = SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH).apply {
            isLenient = false
        }
        return try {
            formatter.parse(dateString)
            true
        } catch (e: Exception) {
            false
        }
    } else {
        val dateString = "$year-$month-$day"
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        return try {
            formatter.parse(dateString)
            true
        } catch (e: Exception) {
            false
        }
    }
}

fun String.toISO8601(): String? {
    val currentTime = LocalDateTime.now().toLocalTime()
    val localDate = LocalDateTime.of(
        this.substring(4, 8).toInt(),
        this.substring(2, 4).toInt(),
        this.substring(0, 2).toInt(),
        currentTime.hour,
        currentTime.minute
    )
    val offsetDate = OffsetDateTime.of(localDate, ZoneOffset.UTC)
    return offsetDate.format(DateTimeFormatter.ISO_DATE_TIME)
}