package com.bounswe.predictionpolls.di

import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import com.bounswe.predictionpolls.data.remote.repositories.ModerationRepository
import com.bounswe.predictionpolls.data.remote.repositories.ModerationRepositoryInterface
import com.bounswe.predictionpolls.data.remote.repositories.PollRepository
import com.bounswe.predictionpolls.data.remote.repositories.PollRepositoryInterface
import com.bounswe.predictionpolls.data.remote.services.AuthService
import com.bounswe.predictionpolls.data.remote.services.ModerationService
import com.bounswe.predictionpolls.data.remote.services.PollService
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object RepositoryModule {
    @Provides
    @Singleton
    fun provideAuthRepository(
        authService: AuthService,
        tokenManager: TokenManager
    ): AuthRepository {
        return AuthRepository(authService, tokenManager)
    }

    @Provides
    @Singleton
    fun providePollRepository(
        pollService: PollService,
    ): PollRepositoryInterface {
        return PollRepository(pollService)
    }

    @Provides
    @Singleton
    fun provideModerationRepository(
        moderationService: ModerationService
    ): ModerationRepositoryInterface {
        return ModerationRepository(moderationService)
    }
}