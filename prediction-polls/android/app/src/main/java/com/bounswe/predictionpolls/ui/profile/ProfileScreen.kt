package com.bounswe.predictionpolls.ui.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.bounswe.predictionpolls.ui.common.poll.DiscreteVoteOption
import com.bounswe.predictionpolls.ui.common.poll.PollComposable
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import java.util.Date

/**
 * This composable is used to display profile information and polls of a user.
 * @param profileInformation is a function that has access to lazy list scope of the profile screen that displays profile information of a user.
 * @param polls is a function that has access to lazy list scope of the profile screen that displays polls of a user.
 * Since these items have access to the lazy list scope, they can be added to the lazy list.
 */
@Composable
fun ProfileScreen(
    profileInformation: @Composable () -> Unit,
    polls: LazyListScope.() -> Unit,
    modifier: Modifier = Modifier
) {
    LazyColumn(modifier = modifier.background(MaterialTheme.colorScheme.surface)) {

        item {
            profileInformation()
        }

        this@LazyColumn.polls()
    }
}


@Preview
@Composable
private fun ProfileScreenPreview() {
    PredictionPollsTheme {
        ProfileScreen(
            profileInformation = {
                ProfileCard(
                    username = "can.gezer13",
                    userFullName = "Can Gezer",
                    coverPhotoUri = "https://picsum.photos/400/400",
                    profilePictureUri = "https://picsum.photos/id/237/200/300",
                    userDescription = "I am a computer engineering student at Bogazici University. I am interested in machine learning and data science.",
                    badgeUris = listOf(
                        "https://picsum.photos/id/231/200/300",
                        "https://picsum.photos/id/232/200/300",
                        "https://picsum.photos/id/233/200/300"
                    ),
                    onProfileEditPressed = { },
                    onRequestsClicked = { },
                    modifier = Modifier.padding(16.dp)
                )

            },
            polls = {
                items(10) {
                    PollComposable(
                        pollCreatorProfilePictureUri = "https://picsum.photos/id/236/200/300",
                        pollCreatorName = "Ahmet Yilmaz",
                        tags = listOf("Lebron", "James", "NBA"),
                        pollQuestionTitle = "Who is the best NBA player?",
                        optionsContent = {
                            Column {
                                DiscreteVoteOption(
                                    optionName = "Lebron James",
                                    voteCount = 150,
                                    fillPercentage = 0.75f,
                                    isSelected = false,
                                )
                                DiscreteVoteOption(
                                    optionName = "Michael Jordan",
                                    voteCount = 50,
                                    fillPercentage = 0.25f,
                                    isSelected = false,
                                )
                            }

                        },
                        modifier = Modifier.padding(16.dp),
                        dueDate = Date(),
                        rejectionText = "Last 5 days",
                        commentCount = 530
                    )
                }
            }
        )
    }
}

