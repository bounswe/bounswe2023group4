# Project Development Weekly Progress Report

**Team Name:** Prediction Polls  
**Date:** 19.12.2023

## Progress Summary
* Color theme has been updated with accordance to feedback received from milestone 2.
* Annotation server's initial implementation is done. Initial Annotation UI implementation is also done.
* Email verification and forgot password pages are implemented and connected to backend.
* Moderation backend is implemented.
* Specific methods for Poll retrieval has been implemented.
* Poll closing and point distribution issued will be looked at this week.
* In mobile, edit profile and Moderation UI is implemented. Moderation integration to backend has started but we couldn't finish it on time.
* Moderation frontend is in progress.
* Until milestone moderation and jury will be finalized.
  
## What was planned for the week? How did it go?

| Description | Issue | Assignee | Due | PR | Estimated Duration | Actual Duration | 
| -------- | ----- | -------- | --- | --- | --- | --- |
| Linking Refresh Token and Users in Database | [#241](https://github.com/bounswe/bounswe2023group4/issues/241) | Şefik Palazoğlu | 19.12.2023 | Unfinished | 2hr | - |
| Implement Poll Comment | [#342](https://github.com/bounswe/bounswe2023group4/issues/342) | Şefik Palazoğlu | 19.12.2023 | Unfinished | 3hr | - |
| Swagger Correction for Poll | [#399](https://github.com/bounswe/bounswe2023group4/issues/399) | Şefik Palazoğlu | 19.12.2023 | Unfinished | 1.5hr | - |
| Semantic Search Research | [#539](https://github.com/bounswe/bounswe2023group4/issues/539) | Şefik Palazoğlu | 19.12.2023 | Unfinished | 4hr | - |
| DateTime Management in createPoll | [#540](https://github.com/bounswe/bounswe2023group4/issues/540) | Şefik Palazoğlu | 19.12.2023 | Unfinished | 2hr | - |
| Annotation Server Conformance | [#545](https://github.com/bounswe/bounswe2023group4/issues/545) | Şefik Palazoğlu | 19.12.2023 | Ongoing [branch](https://github.com/bounswe/bounswe2023group4/tree/backend/feature/annoConformance) | 4hr | 4hr |
| Incorporating Recognito into the Annotation UI | [#531](https://github.com/bounswe/bounswe2023group4/issues/531) | Ali Nasra | 19.12.2023 | cancelled | 5hr | 1hr |
| Connect the backend-server to the annotation UI | [#532](https://github.com/bounswe/bounswe2023group4/issues/532) | Ali Nasra | 19.12.2023 | [#572](https://github.com/bounswe/bounswe2023group4/pull/572) | 3hr | 2hr|
| Implementing the "Follow User" functionality in the Backend | [#541](https://github.com/bounswe/bounswe2023group4/issues/541) | Ali Nasra | 19.12.2023 |  [#575](https://github.com/bounswe/bounswe2023group4/pull/575) | 4hr | 4hr |
| Adding the annotation research results to the wiki  | [#542](https://github.com/bounswe/bounswe2023group4/issues/542) | Ali Nasra | 19.12.2023 | [Wiki Page](https://github.com/bounswe/bounswe2023group4/wiki/Annotation-UI:-Research) | 2hr | 1hr |
| Fixing the annotation approach  | [#543](https://github.com/bounswe/bounswe2023group4/issues/543) | Ali Nasra | 19.12.2023 | [#572](https://github.com/bounswe/bounswe2023group4/pull/572) | 1hr | 6hr |
| Implement Moderation Screen| [#418](https://github.com/bounswe/bounswe2023group4/issues/418) | Yiğit Şekerci | 19.12.23 | [Progress](https://github.com/bounswe/bounswe2023group4/issues/418#issuecomment-1862682619) | 2hr | 2.5hr |
| Research how to implement annotations for mobile| [#547](https://github.com/bounswe/bounswe2023group4/issues/547) | Yiğit Şekerci | 19.12.23 | [Comment](https://github.com/bounswe/bounswe2023group4/issues/547#issuecomment-1862680018) | 2.5hr | 1.5hr |
| Implement annotations in mobile| [#548](https://github.com/bounswe/bounswe2023group4/issues/548) | Yiğit Şekerci | 19.12.23 | Unfinished | 7.5hr | - |
| Add edit logic to the profile page | [#512](https://github.com/bounswe/bounswe2023group4/issues/512) | Ahmet Emre Şafak | 19.12.23 | | 3.5hr | |
| Fix profile image related issues in polls | [#513](https://github.com/bounswe/bounswe2023group4/issues/513) | Ahmet Emre Şafak | 19.12.23 | | 1hr | |
| Add Forgot Password feature to auth flow in mobile | [#549](https://github.com/bounswe/bounswe2023group4/issues/549) | Ahmet Emre Şafak | 19.12.23 | | 4hr | |
| Implement Follow User Functionality in Profile Page in Frontend | [#552](https://github.com/bounswe/bounswe2023group4/issues/552) | Kutay Saran | 19.12.23 | | 3hr | |
| Implement User Profile Hiding Feature in Backend | [#550](https://github.com/bounswe/bounswe2023group4/issues/550) | Kutay Saran | 19.12.23 | | 2hr | |
| Implement not jury page backend connection for becoming jury post | [#562](https://github.com/bounswe/bounswe2023group4/issues/562) | Enes Furkan Arslan | 19.12.2023 | [#577](https://github.com/bounswe/bounswe2023group4/pull/577) | 4h | 4h |
| Complete the implementation of moderator not jury UI | [#559](https://github.com/bounswe/bounswe2023group4/issues/559) | Enes Furkan Arslan | 19.12.2023 | [#577](https://github.com/bounswe/bounswe2023group4/pull/577) | 2h | 2h |
| Implement report functionality to polls | [#565](https://github.com/bounswe/bounswe2023group4/issues/565) | Hebun Şimşek | 19.12.2023 | | 2h | |
| Implement comment functionality to polls | [#567](https://github.com/bounswe/bounswe2023group4/issues/567) | Hebun Şimşek | 19.12.2023 | | 2h | |
| Moderator selection mechanism in system | [#557](https://github.com/bounswe/bounswe2023group4/issues/557) | Emre Batuhan Göç | 19.12.2023 | [#574](https://github.com/bounswe/bounswe2023group4/pull/574) | 3hr | 3hr |
| Moderator request additionally return poll tags and poll question | [#556](https://github.com/bounswe/bounswe2023group4/issues/556) | Emre Batuhan Göç | 17.12.2023 | [#571](https://github.com/bounswe/bounswe2023group4/pull/571) | 1hr | 1hr |
| Moderator endpoint swagger | [#555](https://github.com/bounswe/bounswe2023group4/issues/555) | Emre Batuhan Göç | 17.12.2023 | [#570](https://github.com/bounswe/bounswe2023group4/pull/570) | 1.5hr | 1hr |
| Implement Get another user's opened polls endpoint | [#554](https://github.com/bounswe/bounswe2023group4/issues/554) | Emre Batuhan Göç | 19.12.2023 | [#576](https://github.com/bounswe/bounswe2023group4/pull/576) | 1hr | 0.5hr |
| Poll Grading and Closing System | [#553](https://github.com/bounswe/bounswe2023group4/issues/553) | Emre Batuhan Göç | 19.12.2023 | [related branch](https://github.com/bounswe/bounswe2023group4/tree/backend/feature/poll-closing-%26-grading) | 6hr | 6hr (ONGOING) |
| Implement Guest Mechanics in Web App | [#566](https://github.com/bounswe/bounswe2023group4/issues/566) | Selin Işık | 19.12.2023 | | 2hr | |
|Poll Report, Comment, Share Buttons | [#564](https://github.com/bounswe/bounswe2023group4/issues/564) | Selin Işık | 19.12.2023 | | 4hr | |
| Implement final page of moderation pages(Jury request) | [#563](https://github.com/bounswe/bounswe2023group4/issues/563) | Selin Işık | 19.12.2023 | | 3.5hr | |

## Completed tasks that were not planned for the week

| Description  | Issue | Assignee | Due | PR |
| -------- | ----- | -------- | --- | --- |
| Bug fix - Get Famous Polls endpoint non-voted polls not appearing | [#569](https://github.com/bounswe/bounswe2023group4/issues/556) | Emre Batuhan Göç | 19.12.2023 | [#568](https://github.com/bounswe/bounswe2023group4/pull/568) |
| Annotation UI: Research Popover Component | [#573](https://github.com/bounswe/bounswe2023group4/issues/573) | Ali Nasra | 19.12.2023 |  [Wiki Page](https://github.com/bounswe/bounswe2023group4/wiki/Annotation-UI:-Research) |

## Planned vs. Actual
* [#241](https://github.com/bounswe/bounswe2023group4/issues/241), [#342](https://github.com/bounswe/bounswe2023group4/issues/342), [#399](https://github.com/bounswe/bounswe2023group4/issues/399),[#539](https://github.com/bounswe/bounswe2023group4/issues/539), [#540](https://github.com/bounswe/bounswe2023group4/issues/540) are not finished because Şefik was focusing on annotations this week and burdened with unexpected work unrelated to the course and will make up for it in the last week.
* [#545](https://github.com/bounswe/bounswe2023group4/issues/540) is an ongoing work. Şefik couldn't merge his work in time because of small mismanagement of branches. The work of annotation servers will be merged ASAP. Currently it is dockerized and deployed.
* [#418](https://github.com/bounswe/bounswe2023group4/issues/418) Since the backend progress in Moderation very well we have extended the issue and we will not only finish the UI but also the functionality. Yigit made this adjustment because Yigit believed that he can finish it on time. However, he still need some to finalize the integration and for tests.
* [#548](https://github.com/bounswe/bounswe2023group4/issues/548) Yigit couldn't find spare time to start annotations in mobile.
* [#549](https://github.com/bounswe/bounswe2023group4/issues/549) Ahmet Emre could not finish this task in this week. He will finalize it in the upcoming week.
* [#531](https://github.com/bounswe/bounswe2023group4/issues/531) Ali canceled this task after finding out that the Recognito library is incompatible with React.
* [#543](https://github.com/bounswe/bounswe2023group4/issues/543) Ali spent more time than expected on this task since the use of modals was ruled out as incongruous with the annotation requirements. A new alternative implementation had to be realized from scratch.
* [#553](https://github.com/bounswe/bounswe2023group4/issues/553) Batuhan could not finalize poll grading and closing because of not correctly anticipating the total work load. He will be continuing the poll grading work.

## Your plans for the next week
| Description | Issue | Assignee | Due | Estimated Duration |
| --- | --- | --- | --- | --- |
| Linking Refresh Token and Users in Database | [#241](https://github.com/bounswe/bounswe2023group4/issues/241) | Şefik Palazoğlu | 26.12.2023 | 2hr |
| Implement Poll Comment | [#342](https://github.com/bounswe/bounswe2023group4/issues/342) | Şefik Palazoğlu | 24.12.2023 | 3hr |
| Swagger Correction for Poll | [#399](https://github.com/bounswe/bounswe2023group4/issues/399) | Şefik Palazoğlu | 24.12.2023 | 1.5hr |
| Semantic Search Research | [#539](https://github.com/bounswe/bounswe2023group4/issues/539) | Şefik Palazoğlu | 24.12.2023 |  4hr |
| DateTime Management in createPoll | [#540](https://github.com/bounswe/bounswe2023group4/issues/540) | Şefik Palazoğlu | 24.12.2023 | 2hr |
| Annotation Server Conformance | [#545](https://github.com/bounswe/bounswe2023group4/issues/545) | Şefik Palazoğlu | 21.12.2023 | 1hr |
| Implement moderator page tag selection UI | [#581](https://github.com/bounswe/bounswe2023group4/issues/581) | Enes Furkan Arslan | 25.12.2023 | 2h |
| Implement connection of tag selection on moderator-not-jury page | [#582](https://github.com/bounswe/bounswe2023group4/issues/582) | Enes Furkan Arslan | 25.12.2023 | 4h |
| Implement connection of backend to show the moderator page to member/moderator | [#583](https://github.com/bounswe/bounswe2023group4/issues/583) | Enes Furkan Arslan | 25.12.2023 | 1h |
| Write the unit tests for moderation-not-moderator page | [#584](https://github.com/bounswe/bounswe2023group4/issues/584) | Enes Furkan Arslan | 25.12.2023 | 2h |
| Write unit tests for moderation-not-jury page | [#585](https://github.com/bounswe/bounswe2023group4/issues/585) | Enes Furkan Arslan | 25.12.2023 | 3h | 
| Implement Moderation Screen| [#418](https://github.com/bounswe/bounswe2023group4/issues/418) | Yiğit Şekerci | 25.12.23 | 2hr |
| Implement annotations in mobile| [#548](https://github.com/bounswe/bounswe2023group4/issues/548) | Yiğit Şekerci | 25.12.23 | 7.5hr |
| Implement share URL functionality | [#589](https://github.com/bounswe/bounswe2023group4/issues/589) | Ahmet Emre Safak | 25.12.23 | 6 hours |
| Finalize forgot password scenario | [#549](https://github.com/bounswe/bounswe2023group4/issues/549) | Ahmet Emre Safak | 25.12.23 | 3 hours |
| Implementing the Point system in the backend |  [#590](https://github.com/bounswe/bounswe2023group4/issues/590) |Emre Batuhan Göç, Ali Nasra| 25.12.23 | 4 hours|
| Implementing the Annotation UI for images |  [#592](https://github.com/bounswe/bounswe2023group4/issues/592) | Ali Nasra | 01.01.24 | 2 hours|
| Implement the become moderator request | [#595](https://github.com/bounswe/bounswe2023group4/issues/595) | Enes Furkan Arslan | 25.12.2023 | 2h | 
| Jury Requests Cleanup |  [#594](https://github.com/bounswe/bounswe2023group4/issues/594) | Emre Batuhan Göç | 25.12.23 | 0.5h |
| Update Jury Requests |  [#593](https://github.com/bounswe/bounswe2023group4/issues/593) | Emre Batuhan Göç | 25.12.23 | 1h |
| Grading Continuous Polls |  [#591](https://github.com/bounswe/bounswe2023group4/issues/591) | Emre Batuhan Göç | 25.12.23 | 2h |


## Risks
- We might not be able to finish all aimed requirements due to time constraints.
- Several meeting may be needed during the week, necessary people may not be available at the same time.

## Participants
- Ali Nasra
- Ahmet Emre Şafak
- Emre Batuhan Göç
- Enes Furkan Arslan
- Hebun Şimşek
- Selin Işık
- Şefik Palazoğlu
- Yiğit Şekerci
