package com.bounswe.predictionpolls.data.remote.model.request

data class CreateDiscretePollRequest(
    val question: String,
    val choices: List<String>,
    val openVisibility: Boolean,
    val setDueDate: Boolean,
    val dueDatePoll: String?,
    val numericFieldValue: Int?,
    val selectedTimeUnit: String,
) {
    enum class TimeUnit(val value: String) {
        MINUTE("min"),
        HOUR("h"),
        DAY("day"),
        MONTH("mth"),
    }
}
