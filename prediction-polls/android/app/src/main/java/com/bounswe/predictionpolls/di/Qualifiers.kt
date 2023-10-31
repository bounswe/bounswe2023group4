package com.bounswe.predictionpolls.di

import javax.inject.Qualifier

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class UnauthenticatedOkHttpClient

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class UnauthenticatedRetrofit

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class AuthenticatedOkHttpClient

@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class AuthenticatedRetrofit