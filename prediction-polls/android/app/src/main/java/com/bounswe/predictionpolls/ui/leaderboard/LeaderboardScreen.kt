package com.bounswe.predictionpolls.ui.leaderboard

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.PopupProperties
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.domain.leaderboard.TopicLeaderboard
import com.bounswe.predictionpolls.ui.theme.firstPositionBadgeColor
import com.bounswe.predictionpolls.ui.theme.secondPositionBadgeColor
import com.bounswe.predictionpolls.ui.theme.thirdPositionBadgeColor

@Composable
fun LeaderboardScreen(
    navController: NavController,
    viewModel: LeaderboardViewModel = hiltViewModel()
) {
    LeaderboardScreenUI(
        tags = viewModel.screenState.tags,
        items = viewModel.screenState.leaderboardList,
        selectedTag = viewModel.screenState.selectedTag,
        onTagSelected = {
            viewModel.onEvent(LeaderboardScreenEvent.OnTagSelected(it))
        }
    )
}

@Composable
private fun LeaderboardScreenUI(
    tags: List<String> = emptyList(),
    onTagSelected: (String) -> Unit = {},
    selectedTag: String = "",
    items: List<TopicLeaderboard.User>
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(start = 16.dp, end = 16.dp, bottom = 12.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "Leaderboard",
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.titleLarge,
            fontSize = 20.sp,
            lineHeight = 24.sp
        )
        LeaderboardScreenTagSelection(
            items = tags,
            onItemSelected = onTagSelected,
            selectedItem = selectedTag
        )
        Leaderboard(items)
    }
}

@OptIn(ExperimentalComposeUiApi::class)
@Composable
private fun LeaderboardScreenTagSelection(
    items: List<String>,
    onItemSelected: (String) -> Unit = {},
    selectedItem: String = ""
) {
    var expanded by remember { mutableStateOf(false) }
    val shape = RoundedCornerShape(8.dp)

    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.primaryContainer, shape)
                .clip(shape = shape)
                .clickable {
                    expanded = !expanded
                }
                .padding(vertical = 8.dp, horizontal = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = selectedItem,
                style = MaterialTheme.typography.labelMedium,
                fontSize = 14.sp,
                fontWeight = FontWeight.Medium,
                color = MaterialTheme.colorScheme.onPrimaryContainer,
                textAlign = TextAlign.Center,
            )
            Icon(
                painter = painterResource(id = R.drawable.ic_back),
                contentDescription = stringResource(id = R.string.leaderboard_cd_tag),
                modifier = Modifier.rotate(-90f)
            )
        }

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            properties = PopupProperties(
                usePlatformDefaultWidth = false,
            ),
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.primaryContainer)
                .padding(horizontal = 16.dp)
        ) {
            items.forEach { item ->
                DropdownMenuItem(
                    onClick = {
                        onItemSelected(item)
                        expanded = false
                    },
                    text = {
                        Text(
                            text = item,
                            style = MaterialTheme.typography.labelMedium,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Medium,
                            color = MaterialTheme.colorScheme.onPrimaryContainer,
                            textAlign = TextAlign.Center,
                        )
                    }
                )
            }
        }
    }
}

@Composable
private fun ColumnScope.Leaderboard(
    items: List<TopicLeaderboard.User>
) {
    val shape = RoundedCornerShape(8.dp)

    Column(
        modifier = Modifier
            .weight(1f)
            .clip(shape)
    ) {
        LeaderboardHeader()
        LazyColumn(
            modifier = Modifier.weight(1f)
        ) {
            itemsIndexed(items) { index, item ->
                LeaderboardRow(
                    position = (index + 1).toString(),
                    image = item.profilePicture,
                    username = item.username,
                    point = item.amount.toString()
                )
            }
            if (items.isEmpty()) item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(MaterialTheme.colorScheme.primaryContainer, RoundedCornerShape(bottomEnd = 8.dp, bottomStart = 8.dp))
                        .padding(16.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Leaderboard for selected tag is not available yet.",
                        style = MaterialTheme.typography.labelMedium,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Medium,
                        color = MaterialTheme.colorScheme.onPrimaryContainer,
                        textAlign = TextAlign.Center,
                    )
                }
            }
        }
    }
}

@Composable
private fun LeaderboardRow(
    position: String,
    image: String?,
    username: String,
    point: String,
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(color = MaterialTheme.colorScheme.primaryContainer)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        PositionBadge(
            position = position.toInt()
        ) {
            LeaderboardRowText(
                text = position,
                align = TextAlign.Center,
                color = if (position.toInt() in 1..3) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onPrimaryContainer
            )
        }
        Spacer(modifier = Modifier.width(24.dp))
        image?.let {
            AsyncImage(
                model = image,
                contentDescription = "User profile picture",
                modifier = Modifier
                    .clip(CircleShape)
                    .size(40.dp)
                    .background(Color.Black, CircleShape),
                contentScale = ContentScale.Crop,
                alignment = Alignment.Center
            )
        } ?: run {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(Color.Black, CircleShape),
            )
        }
        Spacer(modifier = Modifier.width(24.dp))
        LeaderboardRowText(
            modifier = Modifier.weight(2f),
            text = username
        )
        LeaderboardRowText(
            modifier = Modifier.weight(1f),
            text = point,
            align = TextAlign.Center
        )
    }
}

@Composable
private fun PositionBadge(
    modifier: Modifier = Modifier,
    position: Int,
    content: @Composable () -> Unit
) {
    val color = when (position) {
        1 -> firstPositionBadgeColor
        2 -> secondPositionBadgeColor
        3 -> thirdPositionBadgeColor
        else -> Color.Unspecified
    }

    Box(
        modifier = modifier
            .size(40.dp)
            .then(
                if (position in 1..3) Modifier.background(color, CircleShape)
                else Modifier
            ),
        contentAlignment = Alignment.Center
    ) {
        content()
    }
}

@Composable
private fun LeaderboardRowText(
    modifier: Modifier = Modifier,
    text: String,
    align: TextAlign = TextAlign.Start,
    color: Color = MaterialTheme.colorScheme.onPrimaryContainer
) {
    Text(
        modifier = modifier,
        text = text,
        style = MaterialTheme.typography.titleSmall,
        fontSize = 14.sp,
        fontWeight = FontWeight.Medium,
        textAlign = align,
        color = color,
    )
}

@Composable
private fun LeaderboardHeader() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(color = MaterialTheme.colorScheme.primary)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier.width(40.dp),
            contentAlignment = Alignment.Center
        ) {
            LeaderboardHeaderText(
                text = stringResource(id = R.string.leaderboard_header_position),
            )
        }
        Spacer(modifier = Modifier.width(88.dp))
        LeaderboardHeaderText(
            modifier = Modifier.weight(2f),
            text = stringResource(id = R.string.leaderboard_header_username)
        )
        LeaderboardHeaderText(
            modifier = Modifier.weight(1f),
            text = stringResource(id = R.string.leaderboard_header_point),
            align = TextAlign.Center
        )
    }
}

@Composable
private fun LeaderboardHeaderText(
    modifier: Modifier = Modifier,
    text: String,
    align: TextAlign = TextAlign.Start
) {
    Text(
        modifier = modifier,
        text = text,
        style = MaterialTheme.typography.titleSmall,
        fontSize = 16.sp,
        fontWeight = FontWeight.SemiBold,
        textAlign = align,
        color = MaterialTheme.colorScheme.onPrimary,
    )
}