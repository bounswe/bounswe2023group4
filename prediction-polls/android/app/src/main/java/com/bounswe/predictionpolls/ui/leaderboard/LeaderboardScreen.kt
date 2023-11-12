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
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import com.bounswe.predictionpolls.ui.theme.firstPositionBadgeColor
import com.bounswe.predictionpolls.ui.theme.secondPositionBadgeColor
import com.bounswe.predictionpolls.ui.theme.thirdPositionBadgeColor

@Composable
fun LeaderboardScreen(
    navController: NavController,
    viewModel: LeaderboardViewModel = hiltViewModel()
) {
    LeaderboardScreenUI(
        items = viewModel.screenState.leaderboardList
    )
}

@Composable
private fun LeaderboardScreenUI(
    items: List<LeaderboardScreenState.LeaderboardItem>
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 24.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        Text(text = "Esports")
        Leaderboard(items)
        LoadMore()
    }
}

@Composable
private fun LeaderboardScreenTagSelection(
    items: List<String>,
    onItemSelected: (String) -> Unit = {},
    selectedIndex: Int = 0,
) {
    var expanded by remember { mutableStateOf(false) }
}

@Composable
private fun ColumnScope.Leaderboard(
    items: List<LeaderboardScreenState.LeaderboardItem>
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
                    image = item.image,
                    username = item.username,
                    point = item.score.toString()
                )
            }
        }
    }
}

@Composable
private fun LeaderboardRow(
    position: String,
    image: String,
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
        Box(
            modifier = Modifier
                .size(40.dp)
                .background(Color.Black, CircleShape)
        )
        Spacer(modifier = Modifier.width(24.dp))
        LeaderboardRowText(
            modifier = Modifier.weight(2f),
            text = username
        )
        LeaderboardRowText(
            modifier = Modifier.weight(1f),
            text = point
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
        fontSize = 16.sp,
        fontWeight = FontWeight.SemiBold,
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
            modifier = Modifier.size(40.dp),
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
            text = stringResource(id = R.string.leaderboard_header_point)
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

@Composable
private fun LoadMore(
    onClick: () -> Unit = {}
) {
    val shape = MaterialTheme.shapes.medium

    Text(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.primary, shape)
            .clip(shape = shape)
            .clickable {
                onClick()
            }
            .padding(vertical = 12.dp),
        text = stringResource(id = R.string.leaderboard_load_more),
        style = MaterialTheme.typography.labelMedium,
        fontSize = 24.sp,
        fontWeight = FontWeight.Medium,
        color = MaterialTheme.colorScheme.onPrimary,
        textAlign = TextAlign.Center,
    )
}

@Preview
@Composable
private fun LeaderboardScreenUIPreview() {
    PredictionPollsTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
        ) {
            LeaderboardScreenUI(
                LeaderboardScreenState.DUMMY_STATE.leaderboardList
            )
        }
    }
}