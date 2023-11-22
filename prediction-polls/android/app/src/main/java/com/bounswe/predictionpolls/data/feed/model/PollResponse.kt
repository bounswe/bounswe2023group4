package com.bounswe.predictionpolls.data.feed.model

import com.bounswe.predictionpolls.domain.poll.ContinuousVoteInputType
import com.bounswe.predictionpolls.domain.poll.Poll

data class PollResponse(val title: String?) // TODO: Implement this class

// TODO: Implement this extension function
fun PollResponse.toPoll(): Poll {
    return Poll.ContinuousPoll(
        "",
        "",
        "",
        "",
        "",
        0,
        emptyList(),
        ContinuousVoteInputType.Date
    )
}
