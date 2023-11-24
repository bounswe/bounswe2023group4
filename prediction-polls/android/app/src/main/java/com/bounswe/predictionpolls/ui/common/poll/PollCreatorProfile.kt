package com.bounswe.predictionpolls.ui.common.poll

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun PollCreatorProfile(imageUri: String?, userName: String, modifier: Modifier = Modifier) {
    Row(modifier = modifier.wrapContentSize(), verticalAlignment = CenterVertically) {
        PollProfilePicture(imageUri = imageUri, modifier = Modifier.size(48.dp))
        Spacer(modifier = Modifier.width(16.dp))
        Text(
            text = userName,
            fontFamily = MontserratFontFamily,
            color = MaterialTheme.colorScheme.scrim,
            fontWeight = FontWeight.Bold
        )
    }

}


// create a preview for above composable
@Preview(showBackground = true, showSystemUi = true)
@Composable
fun PollCreatorProfilePreview() {
    PredictionPollsTheme(dynamicColor = false) {
        PollCreatorProfile(
            "https://picsum.photos/id/237/600/800",
            userName = "Ahmet Emre",
            modifier = Modifier
        )
    }
}

@Composable
private fun PollProfilePicture(imageUri: String?, modifier: Modifier = Modifier) {
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data(imageUri)
            .crossfade(true)
            .build(),
        contentDescription = stringResource(id = R.string.cd_poll_profile_picture),
        modifier = modifier
            .clip(CircleShape),
        contentScale = ContentScale.Crop
    )
}


// create a preview for above composable
@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun PollProfilePicturePreview() {
    PredictionPollsTheme(dynamicColor = false) {
        PollProfilePicture("https://picsum.photos/id/237/600/800", modifier = Modifier)
    }
}