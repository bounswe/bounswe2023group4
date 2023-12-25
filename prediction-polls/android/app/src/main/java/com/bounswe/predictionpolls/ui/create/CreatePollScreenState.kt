package com.bounswe.predictionpolls.ui.create

import androidx.annotation.StringRes
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.data.remote.model.request.CreateContinuousPollRequest
import com.bounswe.predictionpolls.data.remote.model.request.CreateDiscretePollRequest
import com.bounswe.predictionpolls.domain.semantic.SemanticTag
import com.bounswe.predictionpolls.extensions.isValidDate

data class CreatePollScreenState(
    val question: String = "",
    val pollType: PollType = PollType.DISCRETE,
    val discreteOptions: List<String> = listOf("",""),
    val continuousInputType: ContinuousInputType = ContinuousInputType.DATE,
    val isDueDateEnabled: Boolean = false,
    val dueDate: String = "",
    val lastAcceptValue: String = "",
    val acceptValueType: AcceptValueType = AcceptValueType.MINUTE,
    val isDistributionVisible: Boolean = false,
    @StringRes val inputValidationError: Int? = null,
    val isDatePickerVisible: Boolean = false,
    val createdPollId: Int = -1,
    val searchedTag: String = "",
    val tags: List<SemanticTag> = listOf(),
) {
    enum class PollType(val type: String) {
        DISCRETE("Multiple Choice"),
        CONTINUOUS("Customized")
    }

    enum class ContinuousInputType(val type: String) {
        DATE("Date"),
        NUMERIC("Numeric");

        fun toContinuousRequestType(): CreateContinuousPollRequest.PollRequestType {
            return when (this) {
                DATE -> CreateContinuousPollRequest.PollRequestType.DATE
                NUMERIC -> CreateContinuousPollRequest.PollRequestType.NUMERIC
            }
        }
    }

    enum class AcceptValueType(val type: String) {
        MINUTE("Minute"),
        HOUR("Hour"),
        DAY("Day"),
        MONTH("Month");

        fun toDiscreteRequestType(): CreateDiscretePollRequest.TimeUnit {
            return when (this) {
                MINUTE -> CreateDiscretePollRequest.TimeUnit.MINUTE
                HOUR -> CreateDiscretePollRequest.TimeUnit.HOUR
                DAY -> CreateDiscretePollRequest.TimeUnit.DAY
                MONTH -> CreateDiscretePollRequest.TimeUnit.MONTH
            }
        }

        fun toContinuousRequestType(): CreateContinuousPollRequest.TimeUnit {
            return when (this) {
                MINUTE -> CreateContinuousPollRequest.TimeUnit.MINUTE
                HOUR -> CreateContinuousPollRequest.TimeUnit.HOUR
                DAY -> CreateContinuousPollRequest.TimeUnit.DAY
                MONTH -> CreateContinuousPollRequest.TimeUnit.MONTH
            }
        }
    }

    val isQuestionValid: Boolean
        get() = question.isNotBlank()

    val isDiscreteOptionsValid: Boolean
        get() = pollType == PollType.CONTINUOUS ||  discreteOptions.all { it.isNotBlank() }

    val isDueDateValid: Boolean
        get() =  isDueDateEnabled.not() || dueDate.none { it.isDigit().not() } && dueDate.isValidDate()

    fun reduce(event: CreatePollScreenEvent): CreatePollScreenState {
        return when (event) {
            is CreatePollScreenEvent.OnQuestionChanged -> {
                this.copy(question = event.question)
            }

            is CreatePollScreenEvent.OnPollTypeChanged -> {
                this.copy(pollType = event.pollType)
            }

            is CreatePollScreenEvent.OnDiscreteOptionChanged -> {
                this.copy(
                    discreteOptions = discreteOptions.mapIndexed { index, option ->
                        if (index == event.position) {
                            event.option
                        } else {
                            option
                        }
                    }
                )
            }

            is CreatePollScreenEvent.OnDiscreteOptionAdded -> {
                this.copy(discreteOptions = discreteOptions + "")
            }

            is CreatePollScreenEvent.OnDiscreteOptionRemoved -> {
                if (discreteOptions.size <= 2) {
                    this.copy(
                        inputValidationError = R.string.poll_create_screen_option_count_error
                    )
                } else {
                    this.copy(
                        discreteOptions = discreteOptions.filterIndexed { index, _ ->
                            index != event.position
                        }
                    )
                }
            }

            is CreatePollScreenEvent.OnDueDateChecked -> {
                this.copy(isDueDateEnabled = event.isChecked)
            }

            is CreatePollScreenEvent.OnDueDateChanged -> {
                this.copy(dueDate = event.dueDate)
            }

            is CreatePollScreenEvent.OnLastAcceptValueChanged -> {
                this.copy(lastAcceptValue = event.value)
            }

            is CreatePollScreenEvent.OnAcceptValueTypeChanged -> {
                this.copy(acceptValueType = event.type)
            }

            is CreatePollScreenEvent.OnDistributionVisibilityChanged -> {
                this.copy(isDistributionVisible = event.isChecked)
            }

            is CreatePollScreenEvent.OnContinuousInputTypeChanged -> {
                this.copy(continuousInputType = event.inputType)
            }

            is CreatePollScreenEvent.OnErrorDismissed -> {
                this.copy(inputValidationError = null)
            }

            is CreatePollScreenEvent.ToggleDatePicker -> {
                this.copy(isDatePickerVisible = !isDatePickerVisible)
            }

            else -> {
                this
            }
        }
    }
}