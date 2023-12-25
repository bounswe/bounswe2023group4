package com.bounswe.predictionpolls.utils

import android.content.Context
import android.content.Intent

fun Context.shareLink(url: String) {
    val sendIntent: Intent = Intent().apply {
        action = Intent.ACTION_SEND
        putExtra(Intent.EXTRA_TEXT, url)
        type = "text/plain"
    }
    startActivity(Intent.createChooser(sendIntent, "Share link using"))
}