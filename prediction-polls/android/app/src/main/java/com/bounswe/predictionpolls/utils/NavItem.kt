package com.bounswe.predictionpolls.utils

import com.bounswe.predictionpolls.R

enum class NavItem(val route: String) {
    PROFILE("profile"),
    FEED("feed"),
    VOTE_POLL("vote"),
    CREATE_POLL("create_poll"),
    MODERATION("moderation"),
    LEADERBOARD("leaderboard"),
    NOTIFICATIONS("notifications");

    fun toDrawerTitleId(): Int {
        return when (this) {
            PROFILE -> R.string.nav_drawer_profile
            FEED -> R.string.nav_drawer_feed
            VOTE_POLL -> R.string.nav_drawer_vote
            CREATE_POLL -> R.string.nav_drawer_create
            MODERATION -> R.string.nav_drawer_moderation
            LEADERBOARD -> R.string.nav_drawer_leaderboard
            NOTIFICATIONS -> R.string.nav_drawer_notifications
        }
    }

    fun toDrawerIconId(): Int {
        return when (this) {
            PROFILE -> R.drawable.ic_profile
            FEED -> R.drawable.ic_feed
            VOTE_POLL -> R.drawable.ic_vote
            CREATE_POLL -> R.drawable.ic_create
            MODERATION -> R.drawable.ic_moderation
            LEADERBOARD -> R.drawable.ic_leaderboard
            NOTIFICATIONS -> R.drawable.ic_notifications
        }
    }
}
