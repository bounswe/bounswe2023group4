package com.bounswe.predictionpolls.ui.common.annotation

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.DialogProperties
import androidx.hilt.navigation.compose.hiltViewModel
import com.bounswe.predictionpolls.domain.annotation.PollAnnotation
import com.bounswe.predictionpolls.extensions.fromISO8601

@Composable
fun AnnotationDialog(
    onDismissRequest: () -> Unit,
    annotationViewModel: AnnotationViewModel = hiltViewModel()
) {
    val annotations = annotationViewModel.annotations
    AlertDialog(
        properties = DialogProperties(
            usePlatformDefaultWidth = false
        ),
        onDismissRequest = onDismissRequest,
        title = {
            Text(
                text = "Annotations",
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp,
                lineHeight = 20.sp
            )
        },
        confirmButton = {
            Button(
                onClick = {
                    onDismissRequest()
                }
            ) {
                Text(text = "Close")
            }
        },
        text = {
            LazyColumn(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                item {
                    Spacer(modifier = Modifier.height(8.dp))
                }
                items(annotations) {
                    AnnotationCard(annotation = it)
                }
                item {
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }
        }
    )
}

@Composable
private fun AnnotationCard(
    annotation: PollAnnotation
) {
    Card(
        elevation = CardDefaults.cardElevation(
            defaultElevation = 4.dp
        )
    ) {
        Column(
            modifier = Modifier
                .wrapContentHeight()
                .padding(8.dp),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    "Creator: ",
                    fontWeight = FontWeight.Bold,
                )
                Text(text = annotation.creator.substringAfterLast("/"))
            }
            Row(
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    "Created At: ",
                    fontWeight = FontWeight.Bold,
                )
                Text(text = annotation.created.fromISO8601())
            }
            Row(
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    "Targeted Text: ",
                    fontWeight = FontWeight.Bold,
                )
                Text(text = annotation.target.selector.exact)
            }
            Divider()
            Text(text = annotation.body.value)
        }
    }
}