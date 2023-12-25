package com.bounswe.predictionpolls.data.remote.repositories

import com.bounswe.predictionpolls.domain.poll.Poll
import com.bounswe.predictionpolls.domain.semantic.SemanticTag

interface SemanticSearchRepositoryInterface {
    suspend fun getTags(keyword: String): List<SemanticTag>
    suspend fun getPolls(keyword: String): List<Poll>
    suspend fun insertTag(pollId: Int, semanticTagId: String)
}