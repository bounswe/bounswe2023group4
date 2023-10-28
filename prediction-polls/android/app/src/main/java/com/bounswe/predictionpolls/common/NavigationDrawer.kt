package com.bounswe.predictionpolls.common

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.DrawerState
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import com.bounswe.predictionpolls.utils.NavItem
import kotlinx.coroutines.launch

@Composable
fun NavigationDrawer(
    modifier: Modifier = Modifier,
    selectedNavItem: NavItem,
    onButtonClick: (NavItem) -> Unit = {},
    content: @Composable (() -> Unit) -> Unit = {}
) {
    val drawerState = remember {
        DrawerState(
            initialValue = DrawerValue.Closed
        )
    }
    val scope = rememberCoroutineScope()

    fun toggleDrawer() {
        scope.launch {
            if (drawerState.isOpen) {
                drawerState.close()
            } else {
                drawerState.open()
            }
        }
    }

    ModalNavigationDrawer(
        modifier = modifier,
        drawerState = drawerState,
        gesturesEnabled = true,
        scrimColor = Color.Transparent,
        drawerContent = {
            ModalDrawerSheet(
                modifier = Modifier.width(IntrinsicSize.Max),
                drawerContainerColor = MaterialTheme.colorScheme.background,
                drawerContentColor = MaterialTheme.colorScheme.onBackground,
            ) {
                AppTitle()
                Column(
                    modifier = Modifier
                        .fillMaxWidth(),
                ) {
                    NavItem.values().forEach { navItem ->
                        Column {
                            Divider()
                            NavDrawerItem(
                                navItem = navItem,
                                isSelected = selectedNavItem == navItem,
                                onButtonClick = onButtonClick
                            )
                        }
                    }
                }
            }
        },
        content = {
            content {
                toggleDrawer()
            }
        }
    )
}

@Composable
private fun AppTitle() {
    Image(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 24.dp)
            .height(30.dp),
        alignment = Alignment.Center,
        painter = painterResource(id = R.drawable.ic_app_title),
        contentDescription = stringResource(R.string.cd_app_title)
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun NavDrawerItem(
    navItem: NavItem,
    isSelected: Boolean = false,
    onButtonClick: (NavItem) -> Unit = {}
) {
    Card(
        shape = RectangleShape,
        colors = CardDefaults.cardColors(
            contentColor = if (isSelected) {
                MaterialTheme.colorScheme.onPrimary
            } else {
                MaterialTheme.colorScheme.onBackground
            },
            containerColor = if (isSelected) {
                MaterialTheme.colorScheme.primary
            } else {
                MaterialTheme.colorScheme.background
            }
        ),
        onClick = {
            onButtonClick(navItem)
        },
        elevation = CardDefaults.cardElevation(
            defaultElevation = 1.dp
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp, vertical = 18.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Icon(
                modifier = Modifier.size(24.dp),
                painter = painterResource(id = navItem.iconId),
                contentDescription = stringResource(
                    id = R.string.cd_nav_item,
                    navItem.route
                ),
            )
            Text(
                text = stringResource(id = navItem.titleId)
            )
        }
    }
}

@Composable
@Preview
fun NavigationDrawerPreview() {
    PredictionPollsTheme(
        darkTheme = false
    ) {
        NavigationDrawer(
            selectedNavItem = NavItem.FEED
        ) {
            Button(onClick = {
                it()
            }) {
                Text(text = "Click me")
            }
        }
    }
}