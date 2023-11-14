package com.bounswe.predictionpolls.ui.feed

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import com.bounswe.predictionpolls.ui.common.poll.DiscreteVoteOption
import com.bounswe.predictionpolls.ui.common.poll.PollComposable
import java.util.Date

@Composable
fun FeedScreen(modifier: Modifier = Modifier) {
    var text by rememberSaveable { mutableStateOf("") } // this might be stored in VM. I am not sure how we will use this parameter so I will store it here for now..
    Column {
        FeedSearchBar(text = text, onTextChanged = { text = it })
        LazyColumn(modifier = modifier) {
            items(10) {
                PollComposable(
                    pollCreatorProfilePictureUri = "https://picsum.photos/id/237/200/300",
                    pollCreatorName = "John Doe",
                    tags = listOf("Basketball", "NBA", "Lebron James"),
                    pollQuestionTitle = "When was Lebron James drafted?",
                    optionsContent = {
                        Column {
                            DiscreteVoteOption(
                                optionName = "2003",
                                voteCount = 100,
                                fillPercentage = 0.25f,
                                isSelected = true
                            )
                            DiscreteVoteOption(
                                optionName = "2004",
                                voteCount = 200,
                                fillPercentage = 0.5f,
                                isSelected = false
                            )
                            DiscreteVoteOption(
                                optionName = "2005",
                                voteCount = 100,
                                fillPercentage = 0.25f,
                                isSelected = false
                            )
                        }


                    },
                    dueDate = Date(),
                    rejectionText = "Last 5 days",
                    commentCount = 127
                )
            }
        }
    }

}