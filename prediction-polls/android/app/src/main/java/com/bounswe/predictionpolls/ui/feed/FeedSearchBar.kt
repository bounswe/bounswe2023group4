package com.bounswe.predictionpolls.ui.feed

import androidx.compose.foundation.Image
import androidx.compose.material3.OutlinedTextField
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import com.bounswe.predictionpolls.R


@Composable
fun FeedSearchBar(
    text: String,
    onTextChanged: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    OutlinedTextField(
        value = text,
        onValueChange = onTextChanged,
        singleLine = true,
        modifier = modifier,
        leadingIcon = {
            Image(
                painterResource(id = R.drawable.ic_search),
                contentDescription = "Search",
            )
        }
    )
}

// create a preview for above composable

@Preview
@Composable
fun FeedSearchBarPreview() {
    FeedSearchBar("Foo", {})
}