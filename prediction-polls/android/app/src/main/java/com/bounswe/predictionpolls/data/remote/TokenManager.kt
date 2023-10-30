package com.bounswe.predictionpolls.data.remote

import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.map

@Singleton
class TokenManager @Inject constructor(@ApplicationContext context: Context) {
    companion object {
        const val PREFERENCE_FILE_KEY = "AuthPrefs"
        const val ACCESS_TOKEN_KEY = "ACCESS_TOKEN"
        const val REFRESH_TOKEN_KEY = "REFRESH_TOKEN"
    }

    private val prefs = context.getSharedPreferences(PREFERENCE_FILE_KEY, Context.MODE_PRIVATE)

    private val _accessTokenFlow = MutableStateFlow(prefs.getString(ACCESS_TOKEN_KEY, null))
    val accessTokenFlow: Flow<String?> = _accessTokenFlow.asStateFlow()

    private val _refreshTokenFlow = MutableStateFlow(prefs.getString(REFRESH_TOKEN_KEY, null))
    val refreshTokenFlow: Flow<String?> = _refreshTokenFlow.asStateFlow()

    val isLoggedIn: Flow<Boolean> = _accessTokenFlow.map { it != null }

    var accessToken: String?
        get() = _accessTokenFlow.value
        set(value) {
            _accessTokenFlow.value = value
            prefs.edit().putString(ACCESS_TOKEN_KEY, value).apply()
        }

    var refreshToken: String?
        get() = _refreshTokenFlow.value
        set(value) {
            _refreshTokenFlow.value = value
            prefs.edit().putString(REFRESH_TOKEN_KEY, value).apply()
        }

    fun clear() {
        accessToken = null
        refreshToken = null
    }
}

