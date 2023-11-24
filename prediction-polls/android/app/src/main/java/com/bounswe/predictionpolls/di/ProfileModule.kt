package com.bounswe.predictionpolls.di

import com.bounswe.predictionpolls.data.profile.ProfileApi
import com.bounswe.predictionpolls.data.profile.ProfileInfoRemoteDataSource
import com.bounswe.predictionpolls.data.profile.ProfileInfoRemoteDataSourceImpl
import com.bounswe.predictionpolls.data.profile.ProfileInfoRepositoryImpl
import com.bounswe.predictionpolls.domain.profile.ProfileInfoRepository
import dagger.Binds
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ViewModelComponent
import retrofit2.Retrofit

@InstallIn(ViewModelComponent::class)
@Module
abstract class ProfileModule {
    @Binds
    abstract fun bindProfileInfoRepository(
        profileInfoRepository: ProfileInfoRepositoryImpl
    ): ProfileInfoRepository

    @Binds
    abstract fun bindProfileInfoRemoteDataSource(
        profileInfoRemoteDataSourceImpl: ProfileInfoRemoteDataSourceImpl
    ): ProfileInfoRemoteDataSource

    companion object {
        @Provides
        fun provideProfileApi(@UnauthenticatedRetrofit unauthenticatedRetrofit: Retrofit): ProfileApi =
            unauthenticatedRetrofit.create(ProfileApi::class.java)

    }
}