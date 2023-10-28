package com.bounswe.predictionpolls.data.remote

import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TokenManager @Inject constructor(@ApplicationContext context: Context) {
    companion object {
        const val PREFERENCE_FILE_KEY = "AuthPrefs"
        const val ACCESS_TOKEN_KEY = "ACCESS_TOKEN"
        const val REFRESH_TOKEN_KEY = "REFRESH_TOKEN"
    }

    private val prefs = context.getSharedPreferences(PREFERENCE_FILE_KEY, Context.MODE_PRIVATE)

    var accessToken: String?
        get() = prefs.getString(ACCESS_TOKEN_KEY, null)
        set(value) = prefs.edit().putString(ACCESS_TOKEN_KEY, value).apply()

    var refreshToken: String?
        get() = prefs.getString(REFRESH_TOKEN_KEY, null)
        set(value) = prefs.edit().putString(REFRESH_TOKEN_KEY, value).apply()
}
