package com.bounswe.predictionpolls.di

import android.content.Context
import com.bounswe.predictionpolls.BuildConfig
import com.bounswe.predictionpolls.data.remote.TokenManager
import com.bounswe.predictionpolls.data.remote.interceptors.AuthInterceptor
import com.bounswe.predictionpolls.data.remote.interceptors.ResponseInterceptor
import com.bounswe.predictionpolls.data.remote.repositories.AuthRepository
import com.chuckerteam.chucker.api.ChuckerInterceptor
import com.google.gson.Gson
import com.google.gson.GsonBuilder
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
    fun provideGson(): Gson {
        return GsonBuilder()
            .serializeNulls()
            .create()
    }

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

    @UnauthenticatedOkHttpClient
    @Provides
    @Singleton
    fun provideUnauthenticatedOkHttpClient(
        chucker: ChuckerInterceptor
    ): OkHttpClient {
        return OkHttpClient
            .Builder()
            .addInterceptor(chucker)
            .addInterceptor(ResponseInterceptor())
            .build()
    }

    @UnauthenticatedRetrofit
    @Provides
    @Singleton
    fun provideUnauthenticatedRetrofit(
        @UnauthenticatedOkHttpClient okHttpClient: OkHttpClient,
        gson: Gson
    ): Retrofit {
        return Retrofit
            .Builder()
            .baseUrl(BuildConfig.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .client(okHttpClient)
            .build()
    }

    @Provides
    @Singleton
    fun provideAuthInterceptor(
        tokenManager: TokenManager,
        authRepository: AuthRepository
    ): AuthInterceptor {
        return AuthInterceptor(tokenManager, authRepository)
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
            .addInterceptor(authInterceptor)
            .addInterceptor(chucker)
            .addInterceptor(ResponseInterceptor())
            .build()
    }

    @AuthenticatedRetrofit
    @Provides
    @Singleton
    fun provideAuthenticatedRetrofit(
        @AuthenticatedOkHttpClient okHttpClient: OkHttpClient,
        gson: Gson
    ): Retrofit {
        return Retrofit
            .Builder()
            .baseUrl(BuildConfig.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .client(okHttpClient)
            .build()
    }
}