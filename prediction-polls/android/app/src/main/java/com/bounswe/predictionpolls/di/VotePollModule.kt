package com.bounswe.predictionpolls.di

import com.bounswe.predictionpolls.data.vote.VotePollRepositoryImpl
import com.bounswe.predictionpolls.domain.poll.VotePollRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ViewModelComponent

@InstallIn(ViewModelComponent::class)
@Module
abstract class VotePollModule {
    @Binds
    abstract fun bindVotePollRepository(
        votePollRepositoryImpl: VotePollRepositoryImpl
    ): VotePollRepository
}