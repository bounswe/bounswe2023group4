package com.bounswe.predictionpolls.di

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
import retrofit2.Retrofit

@Module
@InstallIn(SingletonComponent::class)
object ServiceModule {
    @Provides
    @Singleton
    fun provideAuthService(
        @UnauthenticatedRetrofit retrofit: Retrofit
    ): AuthService {
        return retrofit.create(AuthService::class.java)
    }

    @Provides
    @Singleton
    fun providePollService(
        @AuthenticatedRetrofit retrofit: Retrofit
    ): PollService {
        return retrofit.create(PollService::class.java)
    }

    @Provides
    @Singleton
    fun provideModerationService(
        @AuthenticatedRetrofit retrofit: Retrofit
    ): ModerationService {
        return retrofit.create(ModerationService::class.java)
    }

    @Provides
    @Singleton
    fun provideAnnotationService(
        @AuthenticatedAnnotationRetrofit retrofit: Retrofit
    ): AnnotationService {
        return retrofit.create(AnnotationService::class.java)
    }

    @Provides
    @Singleton
    fun provideLeaderboardService(
        @AuthenticatedRetrofit retrofit: Retrofit
    ): LeaderboardService {
        return retrofit.create(LeaderboardService::class.java)
    }

    @Provides
    @Singleton
    fun provideSemanticSearchService(
        @AuthenticatedRetrofit retrofit: Retrofit
    ): SemanticSearchService {
        return retrofit.create(SemanticSearchService::class.java)
    }
}