package com.bounswe.predictionpolls.data.remote.services

import com.bounswe.predictionpolls.data.feed.model.PollResponse
import com.bounswe.predictionpolls.data.remote.model.request.InsertSemanticTagRequest
import com.bounswe.predictionpolls.data.remote.model.response.SemanticSearchTagResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface SemanticSearchService {
    @GET("/semantic/tagsearch")
    suspend fun getTags(
        @Query("keyword") keyword: String,
    ): List<SemanticSearchTagResponse>

    @GET("/semantic/pollsearch")
    suspend fun getPolls(
        @Query("keyword") keyword: String,
    ): List<PollResponse>

    @POST("/semantic/insert")
    suspend fun insertTag(
       @Body request: InsertSemanticTagRequest
    )
}