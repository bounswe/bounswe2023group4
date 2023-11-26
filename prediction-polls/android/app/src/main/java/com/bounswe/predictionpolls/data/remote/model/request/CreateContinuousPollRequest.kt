package com.bounswe.predictionpolls.data.remote.model.request

import com.google.gson.annotations.SerializedName

data class CreateContinuousPollRequest(
    val question: String,
    val openVisibility: Boolean,
    val setDueDate: Boolean,
    val dueDatePoll: String?,
    val numericFieldValue: Int?,
    val selectedTimeUnit: String,
    @SerializedName("cont_poll_type")
    val pollType: String,
) {
    enum class TimeUnit(val value: String) {
        MINUTE("min"),
        HOUR("h"),
        DAY("day"),
        MONTH("mth"),
    }

    enum class PollRequestType(val value: String) {
        NUMERIC("numeric"),
        DATE("date"),
    }
}
