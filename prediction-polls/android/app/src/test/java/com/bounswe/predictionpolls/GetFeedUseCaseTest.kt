package com.bounswe.predictionpolls

import com.bounswe.predictionpolls.domain.feed.GetFeedUseCase
import com.bounswe.predictionpolls.repo.FakeFeedRepository
import kotlinx.coroutines.test.runBlockingTest
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class GetFeedUseCaseTest {

    private lateinit var fakeFeedRepository: FakeFeedRepository
    private lateinit var getFeedUseCase: GetFeedUseCase

    @Before
    fun setUp() {
        fakeFeedRepository = FakeFeedRepository()
        getFeedUseCase = GetFeedUseCase(fakeFeedRepository)
    }

    @Test
    fun `invoke returns success with correct data`() = runBlockingTest {
        val result = getFeedUseCase.invoke(1)
        assertTrue(result is com.bounswe.predictionpolls.common.Result.Success)
        assertNotNull((result as com.bounswe.predictionpolls.common.Result.Success).data)
        // Further assertions can be added to check the data content
    }


    @Test
    fun `invoke returns success with correct data on page 2`() = runBlockingTest {
        val result = getFeedUseCase.invoke(2)
        assertTrue(result is com.bounswe.predictionpolls.common.Result.Success)
        assertNotNull((result as com.bounswe.predictionpolls.common.Result.Success).data)
        // Further assertions can be added to check the data content
    }

    @Test
    fun `invoke returns success with correct data on page 0`() = runBlockingTest {
        val result = getFeedUseCase.invoke(0)
        assertTrue(result is com.bounswe.predictionpolls.common.Result.Success)
        assertNotNull((result as com.bounswe.predictionpolls.common.Result.Success).data)
        // Further assertions can be added to check the data content
    }


}