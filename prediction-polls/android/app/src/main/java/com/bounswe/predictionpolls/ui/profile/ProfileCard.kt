package com.bounswe.predictionpolls.ui.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun ProfileCard(
    username: String,
    userFullName: String,
    coverPhotoUri: String?,
    profilePictureUri: String?,
    userDescription: String?,
    badgeUris: List<String>,
    onProfileEditPressed: () -> Unit,
    onRequestsClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    val paddingAroundContent: Dp = 16.dp
    Column(
        modifier = modifier
            .clip(MaterialTheme.shapes.medium)
            .background(MaterialTheme.colorScheme.primaryContainer)
            .wrapContentHeight()
            .fillMaxWidth()
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
                .background(MaterialTheme.colorScheme.primary)
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(paddingAroundContent),
            verticalAlignment = Alignment.Bottom,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            val profilePictureSize: Dp = 100.dp
            Column(
                modifier = Modifier.offset(y = profilePictureSize / -2f - (paddingAroundContent)),
                verticalArrangement = Arrangement.Top,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                ProfilePicture(
                    imageUri = profilePictureUri,
                    modifier = Modifier.size(profilePictureSize)
                )
                UserInfoText(username = username)
                UserInfoText(username = userFullName)
            }
            ProfileCardButtons(
                onRequestsClicked = onRequestsClicked,
                onProfileEditPressed = onProfileEditPressed,
                modifier = Modifier
                    .weight(1f)
                    .padding(paddingAroundContent)
            )

        }

        UserDescription(
            description = userDescription,
            modifier = Modifier.padding(paddingAroundContent)
        )

        Badges(badgeUris = badgeUris, modifier = Modifier.padding(paddingAroundContent))


    }
}

@Composable
private fun ProfileCardButtons(
    onRequestsClicked: () -> Unit,
    onProfileEditPressed: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        verticalArrangement = Arrangement.SpaceBetween,
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = modifier
    ) {
        ProfileEditButton(
            onProfileEditPressed = onProfileEditPressed,
            modifier = Modifier
                .clip(MaterialTheme.shapes.medium)
                .fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(16.dp))
        RequestsButton(
            onRequestsClicked = onRequestsClicked,
            modifier = Modifier
                .border(
                    1.dp,
                    MaterialTheme.colorScheme.primary,
                    MaterialTheme.shapes.medium
                )
                .clip(MaterialTheme.shapes.medium)
                .fillMaxWidth()
        )
    }
}

@Composable
private fun ProfileEditButton(onProfileEditPressed: () -> Unit, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clickable(onClick = onProfileEditPressed)
            .background(MaterialTheme.colorScheme.primary)
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .align(Alignment.Center),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                painter = painterResource(id = R.drawable.ic_edit),
                contentDescription = "Edit Profile",
                tint = MaterialTheme.colorScheme.onPrimary
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = "Edit Profile",
                color = MaterialTheme.colorScheme.onPrimary,
                fontWeight = FontWeight.Normal,
                fontSize = 12.sp,
                letterSpacing = 1.5.sp
            )
        }
    }
}

@Composable
private fun CoverPhoto(imageUri: String?, modifier: Modifier) {
    AsyncImage(
        model = imageUri,
        contentDescription = "User Badge",
        modifier = modifier,
        contentScale = if (imageUri == null) ContentScale.Fit else ContentScale.Crop,
        alignment = Alignment.Center,
    )
}

@Composable
private fun RequestsButton(onRequestsClicked: () -> Unit, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clickable(onClick = onRequestsClicked)
            .background(MaterialTheme.colorScheme.onPrimary)
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .align(Alignment.Center),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                painter = painterResource(id = R.drawable.ic_add),
                contentDescription = "Requests",
                tint = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.width(16.dp))
            Text(
                text = "Requests",
                color = MaterialTheme.colorScheme.primary,
                fontWeight = FontWeight.Normal,
                fontSize = 12.sp,
                letterSpacing = 1.5.sp
            )
        }
    }

}

@Composable
private fun Badges(badgeUris: List<String>, modifier: Modifier = Modifier) {
    LazyRow(modifier = modifier) {
        items(badgeUris) { uri ->
            AsyncImage(
                model = uri,
                contentDescription = "User Badge",
                modifier = modifier
                    .clip(CircleShape)
                    .size(48.dp)
                    .background(Color.Red),
                contentScale = ContentScale.Crop,
                alignment = Alignment.Center
            )
        }
    }
}

@Composable
private fun ProfilePicture(imageUri: String?, modifier: Modifier = Modifier) {
    AsyncImage(
        model = imageUri,
        contentDescription = "User profile picture",
        modifier = modifier
            .clip(CircleShape)
            .size(80.dp),
        contentScale = ContentScale.Crop,
        alignment = Alignment.Center
    )
}

@Composable
private fun UserDescription(description: String?, modifier: Modifier = Modifier) {
    Text(
        text = description ?: "", modifier = modifier,
        maxLines = 5,
        overflow = TextOverflow.Ellipsis,
        color = MaterialTheme.colorScheme.scrim,
        fontFamily = MontserratFontFamily,
        fontSize = 16.sp,
        fontWeight = FontWeight.Normal
    )
}

@Composable
private fun UserInfoText(username: String, modifier: Modifier = Modifier) {
    Text(
        text = username,
        maxLines = 1,
        modifier = modifier,
        overflow = TextOverflow.Ellipsis,
        color = MaterialTheme.colorScheme.scrim,
        fontFamily = MontserratFontFamily,
        fontSize = 22.sp,
        fontWeight = FontWeight.Bold
    )
}


@Preview
@Composable
private fun ProfileEditButtonPreview() {
    PredictionPollsTheme {
        Column {
            ProfileEditButton(
                onProfileEditPressed = {},
                modifier = Modifier
                    .clip(RoundedCornerShape(12.dp))
                    .fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(16.dp))
            RequestsButton(
                onRequestsClicked = {},
                modifier = Modifier
                    .border(2.dp, MaterialTheme.colorScheme.primary, RoundedCornerShape(12.dp))
                    .clip(RoundedCornerShape(12.dp))
                    .fillMaxWidth()
            )
        }
    }
}


@Preview
@Composable
private fun ProfileCardPreview() {
    PredictionPollsTheme {
        ProfileCard(
            "can.gezer13",
            "Can Gezer",
            "https://picsum.photos/400/400",
            "https://picsum.photos/400/400",
            "This is a long description text. Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
            listOf(
                "https://picsum.photos/400/400",
                "https://picsum.photos/400/400",
                "https://picsum.photos/400/400",
                "https://picsum.photos/400/400",
                "https://picsum.photos/400/400",
                "https://picsum.photos/400/400", "https://picsum.photos/400/400"
            ),
            {},
            {},
            modifier = Modifier
        )
    }

}

@Preview(showBackground = true)
@Composable
private fun UserDescriptionPreview() {
    PredictionPollsTheme {
        UserDescription(description = "This is a long description text. Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.")
    }
}