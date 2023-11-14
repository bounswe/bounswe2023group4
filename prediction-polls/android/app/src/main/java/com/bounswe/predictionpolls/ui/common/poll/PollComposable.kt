package com.bounswe.predictionpolls.ui.common.poll

import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@Composable
fun PollComposable(
    pollCreatorProfilePictureUri: String,
    pollCreatorName: String,
    tags: List<String>,
    pollQuestionTitle: String,
    optionsContent: @Composable () -> Unit,
    dueDate: Date,
    rejectionText: String,
    commentCount: Int,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .shadow(4.dp, RoundedCornerShape(12.dp))
            .background(Color.White, RoundedCornerShape(12.dp))
            .padding(16.dp)
            .wrapContentSize()
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight()
        ) {
            PollCreatorProfile(
                imageUri = pollCreatorProfilePictureUri,
                userName = pollCreatorName,
                modifier = Modifier.align(Alignment.End)
            )
            Spacer(modifier = Modifier.height(8.dp))
            PollTagsContent(tags)
            PollQuestionTitle(pollQuestionTitle = pollQuestionTitle)
            optionsContent()
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .wrapContentHeight()
                    .padding(top = 48.dp)
                    .padding(horizontal = 48.dp)
            ) {
                DueDateComposable(
                    dueDate = dueDate,
                    modifier = Modifier.align(Alignment.CenterStart)
                )
                RejectionDateComposable(
                    rejectionText = rejectionText,
                    modifier = Modifier.align(Alignment.CenterEnd)
                )
            }
            Row(
                modifier = Modifier
                    .padding(horizontal = 48.dp)

                    .fillMaxWidth()
                    .wrapContentHeight()
                    .padding(top = 48.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    PollIcon(
                        id = R.drawable.ic_comment,
                        modifier = Modifier.background(
                            MaterialTheme.colorScheme.primary,
                            PollIconShape
                        )
                    )
                    Text(
                        commentCount.toString(),
                        modifier = Modifier.align(Alignment.CenterHorizontally),
                        fontFamily = MontserratFontFamily,
                        color = MaterialTheme.colorScheme.scrim,
                        textAlign = TextAlign.Center,
                        fontSize = 14.sp
                    )
                }
                PollIcon(
                    id = R.drawable.ic_share,
                    modifier = Modifier.background(MaterialTheme.colorScheme.primary, PollIconShape)
                )
                PollIcon(
                    id = R.drawable.ic_warning,
                    modifier = Modifier.background(MaterialTheme.colorScheme.error, PollIconShape)
                )

            }
        }
    }
}

private val PollIconShape = RoundedCornerShape(12.dp)

@Composable
private fun PollIcon(@DrawableRes id: Int, modifier: Modifier = Modifier) {
    Image(
        painter = painterResource(id = id),
        contentDescription = null,
        modifier = modifier
            .padding(16.dp)
            .size(32.dp)
    )

}

@Composable
private fun DueDateComposable(dueDate: Date, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier.wrapContentSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Closing in",
            fontFamily = MontserratFontFamily,
            color = MaterialTheme.colorScheme.scrim,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            fontSize = 14.sp
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = formatDate(dueDate),
            fontFamily = MontserratFontFamily,
            color = MaterialTheme.colorScheme.error,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            fontSize = 14.sp
        )
    }
}

@Composable
private fun RejectionDateComposable(rejectionText: String, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier.wrapContentSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Closing in",
            fontFamily = MontserratFontFamily,
            color = MaterialTheme.colorScheme.scrim,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            fontSize = 14.sp
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = rejectionText,
            fontFamily = MontserratFontFamily,
            color = MaterialTheme.colorScheme.error,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            fontSize = 14.sp
        )
    }
}

@Composable
private fun PollTagsContent(tags: List<String>, modifier: Modifier = Modifier) {
    LazyRow(
        modifier = modifier
            .fillMaxWidth()
            .wrapContentHeight()
    ) {
        items(tags, key = { it }) {
            PollTagComposable(tagName = it, modifier = Modifier.padding(end = 8.dp))
        }
    }
}

@Composable
private fun PollQuestionTitle(pollQuestionTitle: String, modifier: Modifier = Modifier) {
    Text(
        pollQuestionTitle,
        fontFamily = MontserratFontFamily,
        color = MaterialTheme.colorScheme.scrim,
        fontWeight = FontWeight.Bold,
        modifier = modifier
            .padding(vertical = 32.dp)
            .fillMaxWidth()
            .wrapContentHeight(),
        textAlign = TextAlign.Start,
        fontSize = 20.sp
    )
}

@Composable
@Preview(showBackground = true, showSystemUi = true)
fun PollComposablePreview() {
    PredictionPollsTheme(dynamicColor = false) {
        PollComposable(
            "https://picsum.photos/id/237/600/800",
            "Zehra Kaya",
            listOf("Basketball", "Lebron James"),
            "Who is the best basketball player of all time?",
            optionsContent = {
                Column {
                    DiscreteVoteOption(
                        optionName = "Lebron James",
                        voteCount = 125,
                        fillPercentage = 0.5f,
                        isSelected = false,
                    )
                    Spacer(modifier = Modifier.height(24.dp))
                    DiscreteVoteOption(
                        optionName = "Mark Zuckerberg",
                        voteCount = 125,
                        fillPercentage = 0.5f,
                        isSelected = false,
                    )
                }

            },
            dueDate = Date(),
            rejectionText = "Last 5 Days",
            commentCount = 265,
            modifier = Modifier.padding(16.dp)
        )
    }
}

private fun formatDate(dueDate: Date): String {
    val sdf = SimpleDateFormat("dd MMMM yyyy", Locale("tr", "TR"))
    return sdf.format(dueDate)
}