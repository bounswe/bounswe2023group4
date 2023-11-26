package com.bounswe.predictionpolls.ui.create

import com.bounswe.predictionpolls.data.remote.repositories.PollRepositoryInterface
import com.bounswe.predictionpolls.repo.FakePollRepository
import org.junit.Before
import org.junit.Test

class CreatePollViewModelTest {
    private lateinit var pollRepository: PollRepositoryInterface
    private lateinit var viewModel: CreatePollViewModel

    @Before
    fun setup() {
        pollRepository = FakePollRepository()
        viewModel = CreatePollViewModel(pollRepository)
    }

    @Test
    fun `test On Create poll click event with no form data`() {
        var isTriggered = false
        viewModel.onEvent(CreatePollScreenEvent.OnCreatePollClicked{
            isTriggered = true
        })

        assert(isTriggered.not())
        assert(viewModel.screenState.inputValidationError != null)
    }

    @Test
    fun `test on question changed`() {
        val question = "What is your favorite color?"
        viewModel.onEvent(CreatePollScreenEvent.OnQuestionChanged(question))

        assert(viewModel.screenState.question == question)
    }

    @Test
    fun `test on poll type changed`() {
        val pollType = CreatePollScreenState.PollType.DISCRETE
        viewModel.onEvent(CreatePollScreenEvent.OnPollTypeChanged(pollType))

        assert(viewModel.screenState.pollType == pollType)
    }

    @Test
    fun `test on discrete option changed`() {
        val option = "Red"
        val position = 0
        viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionAdded)
        viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionChanged(option, position))

        assert(viewModel.screenState.discreteOptions[position] == option)
    }

    @Test
    fun `test on discrete option added`() {
        viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionAdded)
        assert(viewModel.screenState.discreteOptions.size == 3)
    }

    @Test
    fun `test on discrete option removed`() {
        val option = "Red"
        viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionAdded)
        viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionRemoved(0))

        assert(viewModel.screenState.discreteOptions.contains(option).not())
    }

    @Test
    fun `test on continuous input type changed`() {
        val inputType = CreatePollScreenState.ContinuousInputType.NUMERIC
        viewModel.onEvent(CreatePollScreenEvent.OnContinuousInputTypeChanged(inputType))

        assert(viewModel.screenState.continuousInputType == inputType)
    }

    @Test
    fun `test on due date checked`() {
        val isChecked = true
        viewModel.onEvent(CreatePollScreenEvent.OnDueDateChecked(isChecked))

        assert(viewModel.screenState.isDueDateEnabled == isChecked)
    }

    @Test
    fun `test on due date changed`() {
        val dueDate = "2021-05-01"
        viewModel.onEvent(CreatePollScreenEvent.OnDueDateChanged(dueDate))

        assert(viewModel.screenState.dueDate == dueDate)
    }

    @Test
    fun `test on last accept value changed`() {
        val value = "10"
        viewModel.onEvent(CreatePollScreenEvent.OnLastAcceptValueChanged(value))

        assert(viewModel.screenState.lastAcceptValue == value)
    }

    @Test
    fun `test on accept value type changed`() {
        val type = CreatePollScreenState.AcceptValueType.DAY
        viewModel.onEvent(CreatePollScreenEvent.OnAcceptValueTypeChanged(type))

        assert(viewModel.screenState.acceptValueType == type)
    }

    @Test
    fun `test on distribution visibility changed`() {
        val isChecked = true
        viewModel.onEvent(CreatePollScreenEvent.OnDistributionVisibilityChanged(isChecked))

        assert(viewModel.screenState.isDistributionVisible == isChecked)
    }

    @Test
    fun `test on error dismissed`() {
        viewModel.onEvent(CreatePollScreenEvent.OnErrorDismissed)

        assert(viewModel.screenState.inputValidationError == null)
    }

    @Test
    fun `test toggle date picker`() {
        viewModel.onEvent(CreatePollScreenEvent.ToggleDatePicker)
        assert(viewModel.screenState.isDatePickerVisible)
    }

    @Test
    fun `test on create poll clicked with discrete form data`() {
        val onSuccess = {}
        val question = "What is your favorite color?"
        val pollType = CreatePollScreenState.PollType.DISCRETE
        val option = "Red"
        val position = 0
        viewModel.onEvent(CreatePollScreenEvent.OnQuestionChanged(question))
        viewModel.onEvent(CreatePollScreenEvent.OnPollTypeChanged(pollType))
        viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionAdded)
        viewModel.onEvent(CreatePollScreenEvent.OnDiscreteOptionChanged(option, position))
        viewModel.onEvent(CreatePollScreenEvent.OnCreatePollClicked(onSuccess))

        assert(viewModel.screenState.inputValidationError != null)
    }

    @Test
    fun `test on create poll clicked with continuous form data`() {
        val onSuccess = {}
        val question = "What is your favorite color?"
        val pollType = CreatePollScreenState.PollType.CONTINUOUS
        val inputType = CreatePollScreenState.ContinuousInputType.NUMERIC
        val isChecked = true
        val dueDate = "2021-05-01"
        val value = "10"
        val type = CreatePollScreenState.AcceptValueType.DAY
        val isDistributionVisible = true
        viewModel.onEvent(CreatePollScreenEvent.OnQuestionChanged(question))
        viewModel.onEvent(CreatePollScreenEvent.OnPollTypeChanged(pollType))
        viewModel.onEvent(CreatePollScreenEvent.OnContinuousInputTypeChanged(inputType))
        viewModel.onEvent(CreatePollScreenEvent.OnDueDateChecked(isChecked))
        viewModel.onEvent(CreatePollScreenEvent.OnDueDateChanged(dueDate))
        viewModel.onEvent(CreatePollScreenEvent.OnLastAcceptValueChanged(value))
        viewModel.onEvent(CreatePollScreenEvent.OnAcceptValueTypeChanged(type))
        viewModel.onEvent(CreatePollScreenEvent.OnDistributionVisibilityChanged(isDistributionVisible))
        viewModel.onEvent(CreatePollScreenEvent.OnCreatePollClicked(onSuccess))

        assert(viewModel.screenState.inputValidationError != null)
    }


    @Test
    fun `test on create poll clicked with continuous form data with no last accept value`() {
        val onSuccess = {}
        val question = "What is your favorite color?"
        val pollType = CreatePollScreenState.PollType.CONTINUOUS
        val inputType = CreatePollScreenState.ContinuousInputType.NUMERIC
        val isChecked = true
        val dueDate = "2021-05-01"
        val type = CreatePollScreenState.AcceptValueType.DAY
        val isDistributionVisible = true
        viewModel.onEvent(CreatePollScreenEvent.OnQuestionChanged(question))
        viewModel.onEvent(CreatePollScreenEvent.OnPollTypeChanged(pollType))
        viewModel.onEvent(CreatePollScreenEvent.OnContinuousInputTypeChanged(inputType))
        viewModel.onEvent(CreatePollScreenEvent.OnDueDateChecked(isChecked))
        viewModel.onEvent(CreatePollScreenEvent.OnDueDateChanged(dueDate))
        viewModel.onEvent(CreatePollScreenEvent.OnAcceptValueTypeChanged(type))
        viewModel.onEvent(CreatePollScreenEvent.OnDistributionVisibilityChanged(isDistributionVisible))
        viewModel.onEvent(CreatePollScreenEvent.OnCreatePollClicked(onSuccess))

        assert(viewModel.screenState.inputValidationError != null)
    }
}