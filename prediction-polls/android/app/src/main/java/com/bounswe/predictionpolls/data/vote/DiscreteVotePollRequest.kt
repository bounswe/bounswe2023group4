package com.bounswe.predictionpolls.data.vote

data class DiscreteVotePollRequest(val choiceId: Int, val points: String)

data class ContinuousPollRequest(val choice: String, val points: String)

