package com.bounswe.predictionpolls.ui.common.annotation

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Divider
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalTextToolbar
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.input.getSelectedText
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.bounswe.predictionpolls.domain.annotation.PollAnnotationPages
import com.bounswe.predictionpolls.ui.common.CustomInputField

@Composable
fun AnnotatableText(
    page: PollAnnotationPages,
    text: String,
    annotationViewModel: AnnotationViewModel = hiltViewModel()
) {
    var selectedText by remember { mutableStateOf("") }
    var textInput by remember { mutableStateOf(TextFieldValue(text)) }
    var isDialogOpen by remember { mutableStateOf(false) }

    CompositionLocalProvider(
        LocalTextToolbar provides EmptyTextToolbar,
    ) {
        Box {
            TextField(
                value = textInput,
                onValueChange = { newValue ->
                    textInput = newValue
                    selectedText = textInput.getSelectedText().text
                },
                readOnly = true,
                colors = TextFieldDefaults.colors(
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent,
                    errorContainerColor = Color.Transparent,
                    unfocusedContainerColor = Color.Transparent,
                    focusedContainerColor = Color.Transparent,
                    disabledIndicatorColor = Color.Transparent,
                )
            )
            if (selectedText.isNotEmpty())
                AnnotationToolbar {
                    isDialogOpen = true
                }
        }
        if (isDialogOpen && selectedText.isNotEmpty()) {
            CreateAnnotationDialog(
                onDismiss = {
                    isDialogOpen = false
                },
                onCreateAnnotationClicked = {
                    isDialogOpen = false
                    annotationViewModel.createAnnotation(
                        page = page,
                        prefix = textInput.text.substringBefore(selectedText),
                        exact = selectedText,
                        suffix = textInput.text.substringAfter(selectedText),
                        value = it
                    )
                },
                annotatedText = selectedText
            )
        }
    }
}

@Composable
private fun CreateAnnotationDialog(
    onDismiss: () -> Unit,
    onCreateAnnotationClicked: (
        annotation: String
    ) -> Unit,
    annotatedText: String
) {
    var annotation by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "Create Annotation",
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = "Please type you annotation below.",
                    fontWeight = FontWeight.Medium,
                    fontSize = 14.sp,
                    lineHeight = 18.sp
                )
                Divider()
                CustomInputField(
                    text = annotation,
                    onTextChanged = {
                        annotation = it
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = "The text will be annotated as follows:",
                    fontWeight = FontWeight.Medium,
                    fontSize = 14.sp,
                    lineHeight = 18.sp
                )
                Divider()
                Text(
                    text = annotatedText,
                    fontSize = 14.sp,
                    lineHeight = 18.sp
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    onCreateAnnotationClicked(annotation)
                }
            ) {
                Text("Create")
            }
        },
    )
}

@Composable
private fun BoxScope.AnnotationToolbar(
    onAnnotateClicked: () -> Unit
) {
    Button(
        onClick = {
            onAnnotateClicked()
        },
        modifier = Modifier
            .align(Alignment.TopCenter)
            .offset(y = (-28).dp)
    ) {
        Text(text = "Annotate")
    }

}