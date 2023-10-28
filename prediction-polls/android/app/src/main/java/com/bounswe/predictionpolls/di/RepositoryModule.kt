package com.bounswe.predictionpolls.di

import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import com.bounswe.predictionpolls.data.remote.repositories.TokenRefresherRepository
import com.bounswe.predictionpolls.data.remote.services.AuthService
import com.bounswe.predictionpolls.data.remote.services.TokenRefresherService
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
    fun provideTokenRefresherRepository(
        tokenRefresherService: TokenRefresherService,
        tokenManager: TokenManager
    ): TokenRefresherRepository {
        return TokenRefresherRepository(tokenRefresherService, tokenManager)
    }
}