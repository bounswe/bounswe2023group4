package com.bounswe.predictionpolls.di

import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.repositories.AnnotationRepository
import com.bounswe.predictionpolls.data.remote.repositories.AnnotationRepositoryInterface
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import com.bounswe.predictionpolls.data.remote.repositories.LeaderboardRepository
import com.bounswe.predictionpolls.data.remote.repositories.LeaderboardRepositoryInterface
import com.bounswe.predictionpolls.data.remote.repositories.ModerationRepository
import com.bounswe.predictionpolls.data.remote.repositories.ModerationRepositoryInterface
import com.bounswe.predictionpolls.data.remote.repositories.PollRepository
import com.bounswe.predictionpolls.data.remote.repositories.PollRepositoryInterface
import com.bounswe.predictionpolls.data.remote.repositories.SemanticSearchRepository
import com.bounswe.predictionpolls.data.remote.repositories.SemanticSearchRepositoryInterface
import com.bounswe.predictionpolls.data.remote.services.AnnotationService
import com.bounswe.predictionpolls.data.remote.services.AuthService
import com.bounswe.predictionpolls.data.remote.services.LeaderboardService
import com.bounswe.predictionpolls.data.remote.services.ModerationService
import com.bounswe.predictionpolls.data.remote.services.PollService
import com.bounswe.predictionpolls.data.remote.services.SemanticSearchService
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

    @Provides
    @Singleton
    fun provideAnnotationRepository(
        annotationService: AnnotationService
    ): AnnotationRepositoryInterface {
        return AnnotationRepository(annotationService)
    }

    @Provides
    @Singleton
    fun provideLeaderboardRepository(
        leaderboardService: LeaderboardService
    ): LeaderboardRepositoryInterface {
        return LeaderboardRepository(leaderboardService)
    }

    @Provides
    @Singleton
    fun provideSemanticSearchRepository(
        semanticSearchService: SemanticSearchService
    ): SemanticSearchRepositoryInterface {
        return SemanticSearchRepository(semanticSearchService)
    }
}