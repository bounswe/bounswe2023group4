package com.bounswe.predictionpolls.ui.moderation.list

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
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
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.domain.moderation.ModeratorPoll
import com.bounswe.predictionpolls.domain.moderation.ModeratorTag
import com.bounswe.predictionpolls.ui.moderation.vote.navigateToModerationApplyScreen

@Composable
fun ModerationScreen(
    navController: NavController,
    viewModel: ModerationScreenViewModel = hiltViewModel()
) {
    ModerationScreenUI(
        unSelectedTags = viewModel.screenState.unselectedTags,
        selectedTags = viewModel.screenState.selectedTags,
        requestedPolls = viewModel.screenState.requestedPolls,
        onTagSelected = {
            viewModel.onEvent(ModerationScreenEvent.OnTagSelected(it))
        },
        onTagRemoved = {
            viewModel.onEvent(ModerationScreenEvent.OnTagRemoved(it))
        },
        onResolveClicked = {
            navController.navigateToModerationApplyScreen(it)
        }
    )
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ModerationScreenUI(
    unSelectedTags: List<ModeratorTag> = listOf(),
    selectedTags: List<ModeratorTag> = listOf(),
    requestedPolls: List<ModeratorPoll> = listOf(),
    onTagSelected: (ModeratorTag) -> Unit = {},
    onTagRemoved: (ModeratorTag) -> Unit = {},
    onResolveClicked: (Int) -> Unit = {}
) {
    var showDialog by remember { mutableStateOf(false) }

    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 12.dp, vertical = 16.dp),
    ) {
        item {
            Text(
                text = "Moderation",
                color = MaterialTheme.colorScheme.primary,
                style = MaterialTheme.typography.titleLarge,
                fontSize = 20.sp,
                lineHeight = 24.sp,
                fontWeight = FontWeight.SemiBold,
            )
        }
        item {
            FlowRow(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                selectedTags.forEach {
                    TagBox(
                        tag = it,
                        onTagRemoved = onTagRemoved
                    )
                }
                if (unSelectedTags.isNotEmpty()) {
                    AddTagBox {
                        showDialog = true
                    }
                }
            }
        }
        item {
            Text(
                text = "Choose a poll to resolve",
                color = MaterialTheme.colorScheme.primary,
                style = MaterialTheme.typography.titleLarge,
                fontSize = 20.sp,
                lineHeight = 24.sp,
                textAlign = TextAlign.Center,
                fontWeight = FontWeight.Medium,
                modifier = Modifier.fillMaxWidth().padding(top = 4.dp)
            )
        }
        items(
            requestedPolls
        ) { requestedPoll ->
            RequestedPoll(requestedPoll = requestedPoll, onResolveClicked)
        }
    }

    if (showDialog) {
        TagSelectionDialog(
            unSelectedTags = unSelectedTags,
            onTagSelected = onTagSelected,
            onDismiss = {
                showDialog = false
            }
        )
    }
}

@Composable
private fun TagBox(
    tag: ModeratorTag,
    onTagRemoved: (ModeratorTag) -> Unit = {}
) {
    Row(
        modifier = Modifier
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.25f),
                shape = MaterialTheme.shapes.medium
            )
            .clip(MaterialTheme.shapes.medium)
            .clickable {
                onTagRemoved(tag)
            }
            .padding(horizontal = 8.dp, vertical = 6.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = tag.topic)
        Icon(
            painter = painterResource(id = R.drawable.ic_close),
            contentDescription = null
        )
    }
}

@Composable
private fun AddTagBox(
    onClick: () -> Unit = {}
) {
    Row(
        modifier = Modifier
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.25f),
                shape = MaterialTheme.shapes.medium
            )
            .background(
                MaterialTheme.colorScheme.primary,
                MaterialTheme.shapes.medium
            )
            .clip(MaterialTheme.shapes.medium)
            .clickable {
                onClick()
            }
            .padding(horizontal = 8.dp, vertical = 6.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "Add Tag",
            color = MaterialTheme.colorScheme.onPrimary
        )
        Icon(
            painter = painterResource(id = R.drawable.ic_close),
            contentDescription = null,
            modifier = Modifier.rotate(45f),
            tint = MaterialTheme.colorScheme.onPrimary
        )
    }
}

@Composable
private fun TagSelectionDialog(
    unSelectedTags: List<ModeratorTag> = listOf(),
    onTagSelected: (ModeratorTag) -> Unit = {},
    onDismiss: () -> Unit = {}
) {
    AlertDialog(
        onDismissRequest = { onDismiss() },
        title = {
            Text(
                "Select Tags",
                fontWeight = FontWeight.SemiBold,
            ) },
        text = {
            if (unSelectedTags.isEmpty()) {
                Text(
                    text = "No more tags to select",
                    textAlign = TextAlign.Center
                )
            }
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                items(unSelectedTags) { tag ->
                    TagSelectionItem(
                        tag = tag,
                        onTagSelected = onTagSelected
                    )
                }
            }
        },
        confirmButton = {
            Button(
                onClick = { onDismiss() }
            ) {
                Text("Done")
            }
        }
    )
}

@Composable
private fun TagSelectionItem(
    tag: ModeratorTag,
    onTagSelected: (ModeratorTag) -> Unit = {}
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                onTagSelected(tag)
            }
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = tag.topic)
        Icon(
            painter = painterResource(id = R.drawable.ic_close),
            contentDescription = null,
            modifier = Modifier.rotate(45f),
        )
    }
}

@Composable
private fun RequestedPoll(
    requestedPoll: ModeratorPoll,
    onResolveClicked: (Int) -> Unit = {}
) {
    var isExpanded by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .border(
                width = 1.dp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.25f),
                shape = MaterialTheme.shapes.medium
            )
            .clip(MaterialTheme.shapes.medium)
            .clickable {
                isExpanded = !isExpanded
            }
            .padding(vertical = 16.dp, horizontal = 12.dp)
            .animateContentSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                requestedPoll.poll.tags.forEach { tag ->
                    Box(
                        modifier = Modifier
                            .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(8.dp))
                            .padding(vertical = 8.dp, horizontal = 12.dp)
                    ) {
                        Text(text = tag, color = Color.White)
                    }
                }
            }

            if (requestedPoll.poll.tags.isEmpty()){
                Spacer(modifier = Modifier.weight(1f))
            }
            Icon(
                painter = painterResource(id = R.drawable.ic_back),
                contentDescription = null,
                modifier = Modifier.rotate(if (isExpanded) 90f else -90f)
            )
        }


        Text(
            text = buildAnnotatedString {
                withStyle(
                    style = SpanStyle(
                        fontWeight = FontWeight.SemiBold
                    )
                ){
                    append("Question: ")
                }
                append(requestedPoll.poll.question)
            },
            textAlign = TextAlign.Start,
            fontWeight = FontWeight.Medium
        )

        if (isExpanded) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Spacer(modifier = Modifier.weight(1f))
                Button(
                    onClick = {
                        onResolveClicked(requestedPoll.requestId)
                    }
                ) {
                    Text(text = "Resolve")
                }
            }
        }
    }
}