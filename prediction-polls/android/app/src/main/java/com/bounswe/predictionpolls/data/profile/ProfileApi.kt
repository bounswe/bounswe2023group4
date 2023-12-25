package com.bounswe.predictionpolls.data.profile

import com.bounswe.predictionpolls.data.profile.model.FollowRequest
import com.bounswe.predictionpolls.data.profile.model.GetFollowersRequest
import com.bounswe.predictionpolls.data.profile.model.ProfileInfoResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface ProfileApi {

    @GET("profiles")
    suspend fun fetchProfileInfo(@Query("username") username: String): ProfileInfoResponse

    @POST("profiles/follow")
    suspend fun followUser(@Body followRequest: FollowRequest)

    @POST("profiles/unfollow")
    suspend fun unfollowUser(@Body followRequest: FollowRequest)

    @POST("profiles/follower")
    suspend fun fetchFollowers(@Body getFollowersRequest: GetFollowersRequest): List<String>

    @POST("profiles/followed")
    suspend fun fetchFollowed(@Body getFollowersRequest: GetFollowersRequest):  List<String>

    @GET("profiles/myProfile")
    suspend fun fetchCurrentUserProfileInfo(): ProfileInfoResponse
}