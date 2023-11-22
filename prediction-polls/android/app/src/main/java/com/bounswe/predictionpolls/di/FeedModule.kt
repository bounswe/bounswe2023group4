package com.bounswe.predictionpolls.di

import com.bounswe.predictionpolls.data.feed.FeedRemoteDataSource
import com.bounswe.predictionpolls.data.feed.FeedRemoteDataSourceImpl
import com.bounswe.predictionpolls.data.feed.FeedRepositoryImpl
import com.bounswe.predictionpolls.domain.feed.FeedRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ViewModelComponent

@InstallIn(ViewModelComponent::class)
@Module
abstract class FeedModule {
    @Binds
    abstract fun bindFeedRepository(
        feedRepositoryImpl: FeedRepositoryImpl
    ): FeedRepository

    @Binds
    abstract fun bindFeedRemoteDataSource(
        feedRemoteDataSourceImpl: FeedRemoteDataSourceImpl
    ): FeedRemoteDataSource
}