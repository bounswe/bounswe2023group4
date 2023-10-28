package com.bounswe.predictionpolls.utils

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import com.bounswe.predictionpolls.R

enum class NavItem(
    val route: String,
    @StringRes val titleId: Int,
    @DrawableRes val iconId: Int
) {
    PROFILE(
        route = "profile",
        titleId = R.string.nav_drawer_profile,
        iconId = R.drawable.ic_profile
    ),
    FEED(
        route = "feed",
        titleId = R.string.nav_drawer_feed,
        iconId = R.drawable.ic_feed
    ),
    VOTE_POLL(
        route = "vote_poll",
        titleId = R.string.nav_drawer_vote,
        iconId = R.drawable.ic_vote
    ),
    CREATE_POLL(
        route = "create_poll",
        titleId = R.string.nav_drawer_create,
        iconId = R.drawable.ic_create
    ),
    MODERATION(
        route = "moderation",
        titleId = R.string.nav_drawer_moderation,
        iconId = R.drawable.ic_moderation
    ),
    LEADERBOARD(
        route = "leaderboard",
        titleId = R.string.nav_drawer_leaderboard,
        iconId = R.drawable.ic_leaderboard
    ),
    NOTIFICATIONS(
        route = "notifications",
        titleId = R.string.nav_drawer_notifications,
        iconId = R.drawable.ic_notifications
    ),
}