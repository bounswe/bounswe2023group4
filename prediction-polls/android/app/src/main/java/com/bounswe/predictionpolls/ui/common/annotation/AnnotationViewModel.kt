package com.bounswe.predictionpolls.ui.common.annotation

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.core.BaseViewModel
import com.bounswe.predictionpolls.domain.annotation.AnnotationUseCase
import com.bounswe.predictionpolls.domain.annotation.PollAnnotation
import com.bounswe.predictionpolls.domain.annotation.PollAnnotationPages
import com.bounswe.predictionpolls.domain.profile.GetCurrentUserProfileUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class AnnotationViewModel @Inject constructor(
    private val getCurrentUserProfileUseCase: GetCurrentUserProfileUseCase,
    private val annotationUseCase: AnnotationUseCase
): BaseViewModel() {
    private var annotations by mutableStateOf<List<PollAnnotation>>(emptyList())
    private var username by mutableStateOf<String?>(null)

    init {
        fetchUsername()
    }

    private fun fetchUsername(){
        launchCatching(
            onSuccess = {
                when(it){
                    is Result.Success -> username = it.data.username
                    else -> {}
                }
            }
        ) {
            getCurrentUserProfileUseCase.invoke()
        }
    }

    fun getAnnotations(
        page: PollAnnotationPages,
    ) {
        launchCatching(
            onSuccess = {
                annotations = it
            }
        ) {
            annotationUseCase.getAnnotations(page)
        }
    }

    fun createAnnotation(
        page: PollAnnotationPages,
        prefix: String,
        exact: String,
        suffix: String,
        value: String,
    ) {
        if (username == null) return

        launchCatching(
            onSuccess = {
                getAnnotations(page)
            }
        ) {
            annotationUseCase.createAnnotation(
                page,
                prefix,
                exact,
                suffix,
                value,
                username!!
            )
        }
    }
}