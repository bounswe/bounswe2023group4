package com.bounswe.predictionpolls.di

import android.content.Context
import com.bounswe.predictionpolls.BuildConfig
import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.interceptors.AuthInterceptor
import com.bounswe.predictionpolls.data.remote.repositories.TokenRefresherRepository
import com.chuckerteam.chucker.api.ChuckerInterceptor
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    @Singleton
    fun provideTokenManager(
        @ApplicationContext context: Context
    ): TokenManager {
        return TokenManager(context)
    }

    @Provides
    @Singleton
    fun provideChuckerInterceptor(
        @ApplicationContext context: Context
    ): ChuckerInterceptor {
        return ChuckerInterceptor
            .Builder(context)
            .alwaysReadResponseBody(true)
            .build()
    }

    @TokenRefresherOkHttpClient
    @Provides
    @Singleton
    fun provideOkHttpClient(
        chucker: ChuckerInterceptor
    ): OkHttpClient {
        return OkHttpClient
            .Builder()
            .addInterceptor(chucker)
            .build()
    }

    @TokenRefresherRetrofit
    @Provides
    @Singleton
    fun provideTokenRefresherRetrofit(
        @TokenRefresherOkHttpClient okHttpClient: OkHttpClient
    ): Retrofit {
        return Retrofit
            .Builder()
            .baseUrl(BuildConfig.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient)
            .build()
    }

    @Provides
    @Singleton
    fun provideAuthInterceptor(
        tokenManager: TokenManager,
        tokenRefresherRepository: TokenRefresherRepository
    ): AuthInterceptor {
        return AuthInterceptor(tokenManager, tokenRefresherRepository)
    }

    @AuthenticatedOkHttpClient
    @Provides
    @Singleton
    fun provideAuthenticatedOkHttpClient(
        authInterceptor: AuthInterceptor,
        chucker: ChuckerInterceptor
    ): OkHttpClient {
        return OkHttpClient
            .Builder()
            .addInterceptor(chucker)
            .addInterceptor(authInterceptor)
            .build()
    }

    @AuthenticatedRetrofit
    @Provides
    @Singleton
    fun provideAuthenticatedRetrofit(
        @AuthenticatedOkHttpClient okHttpClient: OkHttpClient
    ): Retrofit {
        return Retrofit
            .Builder()
            .baseUrl(BuildConfig.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient)
            .build()
    }
}