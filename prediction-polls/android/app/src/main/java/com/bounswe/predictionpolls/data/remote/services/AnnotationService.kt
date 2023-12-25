package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.remote.model.request.CreateAnnotationRequest
import com.bounswe.predictionpolls.data.remote.model.response.GetAnnotationsResponse
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface AnnotationService {
    @GET("/annotations")
    suspend fun getAnnotations(
        @Query("source") source: String? = null,
    ): GetAnnotationsResponse

    @GET("/annotations/{id}")
    suspend fun getAnnotation(
        @Path("id") id: String
    ): GetAnnotationsResponse

    @Headers(
        "Content-Type:application/ld+json"
    )
    @POST("/annotations")
    suspend fun createAnnotation(
        @Body createAnnotationRequest: CreateAnnotationRequest
    )

    @DELETE("/annotations/{id}")
    suspend fun deleteAnnotation(
        @Path("id") id: String
    )
}