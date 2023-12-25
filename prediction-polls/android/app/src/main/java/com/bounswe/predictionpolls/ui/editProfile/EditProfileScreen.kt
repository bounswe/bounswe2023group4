package com.bounswe.predictionpolls.ui.editProfile

import android.Manifest
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import coil.compose.AsyncImage
import com.bounswe.predictionpolls.R
import com.bounswe.predictionpolls.ui.common.poll.DatePickerDialogComposable
import com.bounswe.predictionpolls.ui.theme.MontserratFontFamily
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

@Composable
fun EditProfileScreen(
    username: String,
    onUsernameChanged: (String) -> Unit,
    fullName: String,
    onFullNameChanged: (String) -> Unit,
    about: String,
    onAboutChanged: (String) -> Unit,
    birthday: String,
    onBirthdayChanged: (String) -> Unit,
    isShowInProfileSelected: Boolean,
    onShowInProfileClicked: () -> Unit,
    coverUri: String?,
    onCoverChanged: (String) -> Unit,
    imageUri: String?,
    onImageChanged: (String) -> Unit,
    onSaveChangesClicked: ()  -> Unit,
    modifier: Modifier = Modifier
) {

    val permissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission(),
        onResult = { }
    )
    val context = LocalContext.current
    LaunchedEffect(key1 = Unit) {
        if (ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.READ_MEDIA_IMAGES
            ) == PackageManager.PERMISSION_GRANTED
        )
            return@LaunchedEffect
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissionLauncher.launch(Manifest.permission.READ_MEDIA_IMAGES)
        }
    }
    val pickProfileImageLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent(),
        onResult = { uri: Uri? ->
            uri?.let {
                onImageChanged(it.toString())
            }
        }
    )
    val pickCoverImageLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent(),
        onResult = { uri: Uri? ->
            uri?.let {
                onCoverChanged(it.toString())
            }
        }
    )
    Column(
        modifier = modifier
            .verticalScroll(rememberScrollState())
            .fillMaxSize()
            .background(Color.White),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(16.dp))
        ProfileImage(
            imageUri = imageUri,
            onImagePressed = { pickProfileImageLauncher.launch("image/*") },
        )
        Spacer(modifier = Modifier.height(16.dp))
        UserDetailsForm(
            username = username,
            onUsernameChanged = onUsernameChanged,
            fullName = fullName,
            onFullNameChanged = onFullNameChanged,
            about = about,
            onAboutChanged = onAboutChanged
        )
        Spacer(modifier = Modifier.height(16.dp))
        BirthdayRow(
            isShowInProfileSelected = isShowInProfileSelected,
            onShowInProfileClicked = onShowInProfileClicked,
            birthday = birthday,
            onBirthdayChanged = onBirthdayChanged
        )
        Text(
            text = "Cover Photo",
            fontFamily = MontserratFontFamily,
            fontSize = 16.sp,
            modifier = Modifier
                .align(Alignment.Start)
                .padding(horizontal = 32.dp, vertical = 16.dp)
        )
        CoverPhoto(
            coverUri = coverUri,
            onCoverPressed = { pickCoverImageLauncher.launch("image/*") },
            modifier = Modifier.padding(horizontal = 32.dp)
        )
        Spacer(modifier = Modifier.height(16.dp))
        Column {
            Text(
                "Badges (You can choose at most 3)",
                fontFamily = MontserratFontFamily,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(text = "No badges yet.", fontFamily = MontserratFontFamily, fontSize = 16.sp)
        }



        Spacer(modifier = Modifier.height(32.dp))


        Text(
            "Save Changes",
            modifier = Modifier
                .shadow(4.dp, BackgroundShape)
                .clip(BackgroundShape)
                .background(MaterialTheme.colorScheme.primary)
                .padding(16.dp)
                .clickable(onClick = onSaveChangesClicked),

            fontFamily = MontserratFontFamily,
            fontSize = 16.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onPrimary
        )


        Spacer(modifier = Modifier.height(64.dp))

    }
}


// create a preview for above composable
@Preview
@Composable
fun EditProfileScreenPreview() {
    PredictionPollsTheme {
        EditProfileScreen(
            username = "Foo",
            onUsernameChanged = {},
            fullName = "Foo Bar",
            onFullNameChanged = {},
            about = "I am a student",
            onAboutChanged = {},
            birthday = "01/01/2000",
            onBirthdayChanged = {},
            isShowInProfileSelected = true,
            onShowInProfileClicked = {},
            coverUri = "https://picsum.photos/600/300",
            onCoverChanged = {},
            imageUri = "https://picsum.photos/200",
            onImageChanged = {},
            onSaveChangesClicked = {},
            modifier = Modifier.background(Color.White)
        )
    }
}


@Composable
private fun ProfileImage(
    imageUri: String?,
    onImagePressed: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(modifier = modifier.clickable(onClick = onImagePressed)) {
        AsyncImage(
            model = imageUri,
            contentDescription = "Profile image URI", modifier = Modifier
                .align(Alignment.Center)
                .clip(CircleShape)
                .size(80.dp),
            contentScale = ContentScale.Crop
        )
        Icon(
            painter = painterResource(id = R.drawable.ic_camera),
            contentDescription = "Camera",
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .clip(CircleShape)
                .background(MaterialTheme.colorScheme.primary)
                .padding(4.dp)
                .size(24.dp)
        )
    }
}

// create a preview for profile image composable

@Preview
@Composable
private fun ProfileImagePreview() {
    PredictionPollsTheme {
        ProfileImage(
            imageUri = "https://picsum.photos/200",
            onImagePressed = {}
        )
    }

}


@Composable
fun UserDetailsForm(
    username: String,
    onUsernameChanged: (String) -> Unit,
    fullName: String,
    onFullNameChanged: (String) -> Unit,
    about: String,
    onAboutChanged: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier) {
        // Username Field
        OutlinedTextField(
            value = username,
            onValueChange = onUsernameChanged,
            modifier = Modifier.padding(8.dp),
            label = { Text(text = "Username") },
        )

        OutlinedTextField(
            value = fullName,
            onValueChange = onFullNameChanged,
            modifier = Modifier.padding(8.dp),
            label = { Text(text = "Full Name") },
        )

        // About Field
        OutlinedTextField(
            value = about,
            onValueChange = onAboutChanged,
            modifier = Modifier.padding(8.dp),
            label = { Text(text = "About") },
        )
    }
}


// create a preview for above composable
@Preview
@Composable
fun UserDetailsFormPreview() {
    PredictionPollsTheme {
        UserDetailsForm(
            username = "Foo",
            onUsernameChanged = {},
            fullName = "Foo Bar",
            onFullNameChanged = {},
            about = "I am a student",
            onAboutChanged = {},
            modifier = Modifier.background(Color.White)
        )

    }
}

@Composable
fun CoverPhoto(
    coverUri: String?,
    onCoverPressed: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .aspectRatio(2.7f) // Adjust the aspect ratio based on your design needs
            .clip(RoundedCornerShape(12.dp))
            .clickable(onClick = onCoverPressed)
            .background(Color.Gray) // Placeholder for loading image
    ) {
        AsyncImage(
            model = coverUri,
            contentDescription = "Cover photo",
            modifier = Modifier.matchParentSize(),
            contentScale = ContentScale.Crop
        )
    }
}

@Preview
@Composable
fun CoverPhotoPreview() {
    PredictionPollsTheme {
        CoverPhoto(
            coverUri = "https://picsum.photos/600/300",
            onCoverPressed = {}
        )
    }
}


@Composable
private fun BirthdayRow(
    isShowInProfileSelected: Boolean,
    onShowInProfileClicked: () -> Unit,
    birthday: String,
    onBirthdayChanged: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    Row(modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
        Checkbox(checked = isShowInProfileSelected, onCheckedChange = { onShowInProfileClicked() })
        Text(text = "Show in Profile")
        Spacer(modifier = Modifier.width(16.dp))
        var showDatePickerDialog by rememberSaveable {
            mutableStateOf(false)
        }
        if (showDatePickerDialog) {
            DatePickerDialogComposable(
                initialDate = birthday,
                onConfirm = onBirthdayChanged,
                onDismiss = { showDatePickerDialog = false },
                modifier = Modifier.requiredSize(getScreenSize())
            )
        }
        Column(modifier = Modifier) {
            Text(text = "Birthday", fontFamily = MontserratFontFamily, fontSize = 16.sp)
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = birthday,
                fontFamily = MontserratFontFamily,
                fontSize = 16.sp,
                textAlign = TextAlign.Start,
                modifier = Modifier
                    .aspectRatio(3.5f)
                    .border(
                        2.dp,
                        MaterialTheme.colorScheme.secondary,
                        BackgroundShape
                    )
                    .padding(16.dp)
                    .fillMaxWidth()
                    .clickable {
                        showDatePickerDialog = true
                    })

        }
    }

}

private val BackgroundShape = RoundedCornerShape(12.dp)


@Composable
private fun getScreenSize(): DpSize {
    val configuration = LocalConfiguration.current
    return DpSize(width = configuration.screenWidthDp.dp, height = configuration.screenHeightDp.dp)
}


// create a preview for above composable
@Preview
@Composable
private fun BirthdayRowPreview() {
    PredictionPollsTheme {
        BirthdayRow(
            isShowInProfileSelected = true,
            onShowInProfileClicked = {},
            birthday = "01/01/2000",
            onBirthdayChanged = {},
            modifier = Modifier.background(Color.White)
        )
    }
}