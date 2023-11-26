package com.bounswe.predictionpolls.utils

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.create.CREATE_POLL_ROUTE
import com.bounswe.predictionpolls.ui.feed.FEED_ROUTE
import com.bounswe.predictionpolls.ui.leaderboard.LEADERBOARD_ROUTE
import com.bounswe.predictionpolls.ui.profile.PROFILE_SCREEN_ROUTE

enum class NavItem(
    val route: String,
    @StringRes val titleId: Int,
    @DrawableRes val iconId: Int
) {
    PROFILE(
        route = PROFILE_SCREEN_ROUTE,
        titleId = R.string.nav_drawer_profile,
        iconId = R.drawable.ic_profile
    ),
    FEED(
        route = FEED_ROUTE,
        titleId = R.string.nav_drawer_feed,
        iconId = R.drawable.ic_feed
    ),
    VOTE_POLL(
        route = "vote_poll", // TODO: change this route with the actual route
        titleId = R.string.nav_drawer_vote,
        iconId = R.drawable.ic_vote
    ),
    CREATE_POLL(
        route = CREATE_POLL_ROUTE,
        titleId = R.string.nav_drawer_create,
        iconId = R.drawable.ic_create
    ),
    MODERATION(
        route = "moderation", // TODO: change this route with the actual route
        titleId = R.string.nav_drawer_moderation,
        iconId = R.drawable.ic_moderation
    ),
    LEADERBOARD(
        route = LEADERBOARD_ROUTE,
        titleId = R.string.nav_drawer_leaderboard,
        iconId = R.drawable.ic_leaderboard
    ),
    NOTIFICATIONS(
        route = "notifications", // TODO: change this route with the actual route
        titleId = R.string.nav_drawer_notifications,
        iconId = R.drawable.ic_notifications
    ),
}