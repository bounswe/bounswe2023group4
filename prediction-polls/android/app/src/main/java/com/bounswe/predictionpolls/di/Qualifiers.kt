package com.bounswe.predictionpolls.di

import javax.inject.Qualifier

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class TokenRefresherOkHttpClient

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class TokenRefresherRetrofit

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class AuthenticatedOkHttpClient

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class AuthenticatedRetrofit