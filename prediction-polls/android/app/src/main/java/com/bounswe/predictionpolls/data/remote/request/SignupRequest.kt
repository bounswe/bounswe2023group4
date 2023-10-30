package com.bounswe.predictionpolls.data.remote.request

data class SignupRequest(
    val email: String,
    val username: String,
    val password: String,
    val birthday: String
)
