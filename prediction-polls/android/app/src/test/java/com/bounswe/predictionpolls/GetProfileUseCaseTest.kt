package com.bounswe.predictionpolls

import com.bounswe.predictionpolls.common.Result
import com.bounswe.predictionpolls.domain.profile.GetProfileInfoUseCase
import com.bounswe.predictionpolls.repo.FakeProfileInfoRepository
import kotlinx.coroutines.test.runBlockingTest
import org.junit.Before
import org.junit.Test
import org.junit.Assert.*

class GetProfileInfoUseCaseTest {

    private lateinit var fakeProfileInfoRepository: FakeProfileInfoRepository
    private lateinit var getProfileInfoUseCase: GetProfileInfoUseCase

    @Before
    fun setUp() {
        fakeProfileInfoRepository = FakeProfileInfoRepository()
        getProfileInfoUseCase = GetProfileInfoUseCase(fakeProfileInfoRepository)
    }

    @Test
    fun `invoke returns success with correct data`() = runBlockingTest {
        val result = getProfileInfoUseCase("testUser")
        assertTrue(result is Result.Success)
        assertEquals("testUser", (result as Result.Success).data.username)
    }

    @Test
    fun `invoke returns error on repository failure`() = runBlockingTest {
        fakeProfileInfoRepository.setReturnError(true)

        val result = getProfileInfoUseCase("testUser")
        assertTrue(result is Result.Error)
    }
}