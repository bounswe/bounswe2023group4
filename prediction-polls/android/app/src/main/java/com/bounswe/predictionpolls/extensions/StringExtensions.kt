package com.bounswe.predictionpolls.extensions

fun String.isValidEmail(): Boolean {
    val emailRegex = Regex(
        pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
        option = RegexOption.IGNORE_CASE
    )
    return emailRegex.matches(this)
}

// TODO handle date validation better
fun String.isValidDate(): Boolean {
    if (this.length != 8) return false
    val day = this.substring(0, 2).toInt()
    val month = this.substring(2, 4).toInt()

    if (day !in 1..31) return false
    if (month !in 1..12) return false
    return true
}