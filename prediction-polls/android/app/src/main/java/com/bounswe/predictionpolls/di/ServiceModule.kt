package com.bounswe.predictionpolls.di

import com.bounswe.predictionpolls.data.remote.services.AuthService
import com.bounswe.predictionpolls.data.remote.services.TokenRefresherService
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
        @AuthenticatedRetrofit retrofit: Retrofit
    ): AuthService {
        return retrofit.create(AuthService::class.java)
    }

    @Provides
    @Singleton
    fun provideTokenRefresherService(
        @TokenRefresherRetrofit retrofit: Retrofit
    ): TokenRefresherService {
        return retrofit.create(TokenRefresherService::class.java)
    }
}