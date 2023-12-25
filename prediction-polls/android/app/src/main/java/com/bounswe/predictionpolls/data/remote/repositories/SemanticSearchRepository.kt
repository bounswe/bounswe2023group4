package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.core.BaseRepository
import com.bounswe.predictionpolls.data.remote.model.request.InsertSemanticTagRequest
import com.bounswe.predictionpolls.data.remote.services.SemanticSearchService
import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.semantic.SemanticTag
import javax.inject.Inject

class SemanticSearchRepository @Inject constructor(
    private val semanticSearchService: SemanticSearchService
): BaseRepository(), SemanticSearchRepositoryInterface {
    override suspend fun getTags(keyword: String): List<SemanticTag> {
        return execute {
            semanticSearchService.getTags(keyword).map { it.toSemanticTag() }
        }
    }

    override suspend fun getPolls(keyword: String): List<Poll> {
        return execute {
            semanticSearchService.getPolls(keyword).map { it.toPollDomainModel() }
        }
    }

    override suspend fun insertTag(pollId: Int, semanticTagId: String) {
        execute {
            val request = InsertSemanticTagRequest(pollId, semanticTagId)
            semanticSearchService.insertTag(request)
        }
    }
}