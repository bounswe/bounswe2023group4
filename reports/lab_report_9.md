# Project Development Weekly Progress Report

**Team Name:** Prediction Polls  
**Date:** 05.12.2023

## Progress Summary
* In the 2nd milestone we reviewed the critique we received about color layout, semantic tagging, displaying if a poll is closed or not.
* We implemented an automatic subject tagging system, added profile pictures to profile. Implemented voting page and feed page. We implemented the voting and point distribution for multiple choice polls.
* Unit testing was done mostly but needs to be improved further.
* We plan to work on semantic tagging, annotation, moderation system, and jury system until the final milestone.
* In mobile instead of focusing on new feature (moderation), we worked on existing bugs and design flaws to wrap up the app until the milestone.
  
## What was planned for the week? How did it go?

| Description | Issue | Assignee | Due | PR | Estimated Duration | Actual Duration | 
| -------- | ----- | -------- | --- | --- | --- | --- |
| Linking Refresh Token and Users in Database | [#241](https://github.com/bounswe/bounswe2023group4/issues/241) | Şefik Palazoğlu | 21.11.2023 | | 3hr | Unfinished |
| Implement Poll Comment | [#342](https://github.com/bounswe/bounswe2023group4/issues/342) | Şefik Palazoğlu | 26.11.2023 | | 3hr | Unfinished |
| Make Vote page responsive | [#366](https://github.com/bounswe/bounswe2023group4/issues/366) | Selin Işık | 21.11.23 | | 1hr | Cancelled |
| Make Profile page responsive | [#365](https://github.com/bounswe/bounswe2023group4/issues/365) | Selin Işık | 21.11.23 | [#476](https://github.com/bounswe/bounswe2023group4/pull/476) | 1hr | 1hr |
| Unit Tests for Poll Endpoints | [#344](https://github.com/bounswe/bounswe2023group4/issues/344) | Şefik Palazoğlu | 26.11.2023 | [#469](https://github.com/bounswe/bounswe2023group4/pull/469) | 4hr | 3.5hr |
| Signup Birthday Requirement |[#421](https://github.com/bounswe/bounswe2023group4/issues/421) | Hebun Şimşek | 22.11.2023 |[#427](https://github.com/bounswe/bounswe2023group4/pull/427) | 1hr | 1.5hr |
| Authentication error management | [#413](https://github.com/bounswe/bounswe2023group4/issues/413) | Emre Batuhan Göç | 22.11.2023 | [#430](https://github.com/bounswe/bounswe2023group4/pull/430) | 2hr | 1.5hr |
| Email Verification Improvement | [#422](https://github.com/bounswe/bounswe2023group4/issues/422) | Hebun Şimşek | 24.11.2023 | | 1hr | Unfinished |
| Swagger Correction for Poll | [#399](https://github.com/bounswe/bounswe2023group4/issues/399) | Şefik Palazoğlu | 24.11.2023 | [#436](https://github.com/bounswe/bounswe2023group4/pull/436), [Progress](https://github.com/bounswe/bounswe2023group4/tree/backend/improvement/pollSwagger) | 3hr | Unfinished |
| Poll Voting | [#400](https://github.com/bounswe/bounswe2023group4/issues/400) | Şefik Palazoğlu | 23.11.2023 | [#440](https://github.com/bounswe/bounswe2023group4/pull/440) | 2hr | 2hr |
| Poll GET return format | [#402](https://github.com/bounswe/bounswe2023group4/issues/402) | Şefik Palazoğlu | 23.11.2023 | [#431](https://github.com/bounswe/bounswe2023group4/pull/431) | 3hr | 3hr |
| Poll GET Poll Creator Name | [#403](https://github.com/bounswe/bounswe2023group4/issues/403) | Şefik Palazoğlu | 22.11.2023 | [#426](https://github.com/bounswe/bounswe2023group4/pull/426) | 2hr | 2hr |
| Point System | [#405](https://github.com/bounswe/bounswe2023group4/issues/405) | Şefik Palazoğlu, Emre Batuhan Göç | 24.11.2023 | [#439](https://github.com/bounswe/bounswe2023group4/pull/439) | 6hr | 5.5hr |
| Finalize Authentication pages' backend connections | [#401](https://github.com/bounswe/bounswe2023group4/issues/401) | Kutay Saran, Enes Furkan Arslan | 27.11.2023 | [#446](https://github.com/bounswe/bounswe2023group4/pull/446) | 3h | 2h | 
| Add point indicator component to create poll page | [#404](https://github.com/bounswe/bounswe2023group4/issues/404) | Enes Furkan Arslan | 27.11.2023 | [#445](https://github.com/bounswe/bounswe2023group4/pull/445) | 1h | 0.5h |
| Validate user input on create poll page | [#406](https://github.com/bounswe/bounswe2023group4/issues/406) | Enes Furkan Arslan | 27.11.2023 | [#445](https://github.com/bounswe/bounswe2023group4/pull/445) | 4h | 4h |
| Finalize Create poll page's backend connections | [#407](https://github.com/bounswe/bounswe2023group4/issues/407) | Enes Furkan Arslan | 27.11.2023 | [#445](https://github.com/bounswe/bounswe2023group4/pull/445) | 4h | 5h |
| Implement Authentication Token Management Middleware | [#409](https://github.com/bounswe/bounswe2023group4/issues/409) | Kutay Saran | 27.11.2023 | | 5hr | Unfinished |
| Implement Poll Feed Page's Backend Connection | [#408](https://github.com/bounswe/bounswe2023group4/issues/408) | Kutay Saran | 27.11.2023 | | 2hr | 2hr |
| Image storage and usage | [#415](https://github.com/bounswe/bounswe2023group4/issues/415) | Selin Işık, Emre Batuhan Göç, Hebun Şimşek | 24.11.2023 | [#437](https://github.com/bounswe/bounswe2023group4/pull/437) | 4hr | 4hr |
| Update swagger and write unit tests for profile endpoints | [#414](https://github.com/bounswe/bounswe2023group4/issues/414) | Emre Batuhan Göç | 27.11.2023 | [#477](https://github.com/bounswe/bounswe2023group4/pull/477), [#433](https://github.com/bounswe/bounswe2023group4/pull/433) | 2.5hr | 2.5hr |
| Create mock badges for profiles | [#412](https://github.com/bounswe/bounswe2023group4/issues/412) | Emre Batuhan Göç | 24.11.2023 | [#434](https://github.com/bounswe/bounswe2023group4/pull/434) | 1hr | 0.5hr |
| Generate profile automatically on sign up | [#411](https://github.com/bounswe/bounswe2023group4/issues/411) | Emre Batuhan Göç | 24.11.2023 | [#432](https://github.com/bounswe/bounswe2023group4/pull/432) | 1hr | 1hr |
| Profile implement get my profile endpoint | [#410](https://github.com/bounswe/bounswe2023group4/issues/410) | Emre Batuhan Göç | 24.11.2023 | [#433](https://github.com/bounswe/bounswe2023group4/pull/433) | 1hr | 1hr |
| Profile Page Backend Integration | [#419](https://github.com/bounswe/bounswe2023group4/issues/420) | Selin Işık | 27.11.23 | [#476](https://github.com/bounswe/bounswe2023group4/pull/476) | 1.5h | 2hr |
| Edit Profile Page Backend Integration | [#420](https://github.com/bounswe/bounswe2023group4/issues/419) | Selin Işık| 27.11.23 | [#476](https://github.com/bounswe/bounswe2023group4/pull/476) | 2hr | 1.5hr |
| Implement create poll screen UI | [#314](https://github.com/bounswe/bounswe2023group4/issues/314) | Yiğit Şekerci | 23.11.23 | [PR#435](https://github.com/bounswe/bounswe2023group4/pull/435) | 1hr | 1.5hr |
| Increase Mobile App tests' code coverage | [#317](https://github.com/bounswe/bounswe2023group4/issues/317) | Yiğit Şekerci | 27.11.23 | [PR#468](https://github.com/bounswe/bounswe2023group4/pull/468) | 1hr | 2hr |
| Implement feed screen backend requests | [#362](https://github.com/bounswe/bounswe2023group4/issues/362) | Ahmet Emre Şafak | 27.11.23 | [PR#438](https://github.com/bounswe/bounswe2023group4/pull/438) | 2.5hr | 2.5hr |
| Implement create poll screen backend requests| [#361](https://github.com/bounswe/bounswe2023group4/issues/361) | Yiğit Şekerci | 23.11.23 | [PR#435](https://github.com/bounswe/bounswe2023group4/pull/435) | 0.5hr | 1hr |
| Implement Profile Screen Backend Requests| [#416](https://github.com/bounswe/bounswe2023group4/issues/416) | Ahmet Emre Şafak | 27.11.23 | [PR#438](https://github.com/bounswe/bounswe2023group4/pull/438) | 3hr | 2hr |
| Implement Poll Detail Screen Backend Requests| [#417](https://github.com/bounswe/bounswe2023group4/issues/417) | Ahmet Emre Şafak | 27.11.23 | [PR#462](https://github.com/bounswe/bounswe2023group4/pull/462) | 2.5hr | 1.5hr |
| Implement Moderation Screen UI| [#418](https://github.com/bounswe/bounswe2023group4/issues/418) | Yiğit Şekerci | 27.11.23 | - | 3.5hr | On hold |
| Deployment of our frontend and backend for milestone | [#423](https://github.com/bounswe/bounswe2023group4/issues/423) | Hebun Şimşek | 28.11.2023 | [link](https://github.com/bounswe/bounswe2023group4/issues/423#issuecomment-1828411786) | 2hr | 2hr |
| Writing Scenario Test| [#424](https://github.com/bounswe/bounswe2023group4/issues/424) | Ali Nasra | 22.11.2023 | [#443](https://github.com/bounswe/bounswe2023group4/pull/443)| 2hr | 1hr |
| Update requirements according to the feedbacks | [#486](https://github.com/bounswe/bounswe2023group4/issues/486) | Enes Furkan Arslan | 4.12.2023 | [#486](https://github.com/bounswe/bounswe2023group4/issues/486) | 1h | 1h | 
| Add overview and update glossary for requirements according to the feedbacks | [#488](https://github.com/bounswe/bounswe2023group4/issues/488) | Enes Furkan Arslan | 4.12.2023 | [#488](https://github.com/bounswe/bounswe2023group4/issues/488) | 1h | 1h |
| Add progress based on requirements to milestone report 2 | [#489](https://github.com/bounswe/bounswe2023group4/issues/489) | Enes Furkan Arslan | 1.12.2023 | [#484](https://github.com/bounswe/bounswe2023group4/issues/484) | 1h | 2h |


## Completed tasks that were not planned for the week

| Description  | Issue | Assignee | Due | PR |
| -------- | ----- | -------- | --- | --- |
| Add Automatic Tag Functionality | - | Şefik Palazoğlu | 28.11.2023 | [#475](https://github.com/bounswe/bounswe2023group4/pull/475)
| Authentication Requirement at Poll GET endpoint | [#447](https://github.com/bounswe/bounswe2023group4/issues/447) | Şefik Palazoğlu | 28.11.2023 | [#448](https://github.com/bounswe/bounswe2023group4/pull/448) |
| Reject Votes null value | [#450](https://github.com/bounswe/bounswe2023group4/issues/450) | Şefik Palazoğlu | 28.11.2023 | [#451](https://github.com/bounswe/bounswe2023group4/pull/451) |
| Manual Poll Closing issue For Discrete Polls | [#456](https://github.com/bounswe/bounswe2023group4/issues/456) | Şefik Palazoğlu | 28.11.2023 | [#459](https://github.com/bounswe/bounswe2023group4/pull/459) |
| Username Attached to poll | [#463](https://github.com/bounswe/bounswe2023group4/issues/463) | Şefik Palazoğlu | 28.11.2023 | [#465](https://github.com/bounswe/bounswe2023group4/pull/465) |
| Finishing the integration of the Vote Page UI with the back-end server|[#347](https://github.com/bounswe/bounswe2023group4/issues/347) | Ali Nasra | 28.11.2023 | [#449](https://github.com/bounswe/bounswe2023group4/pull/449) |
| Solving Poll option padding problem | [#452](https://github.com/bounswe/bounswe2023group4/issues/452) | Ali Nasra | 28.11.2023 | [#455](https://github.com/bounswe/bounswe2023group4/pull/455) |
| Unspecified closingDate Poll Render Problem|[#454](https://github.com/bounswe/bounswe2023group4/issues/454) | Ali Nasra | 28.11.2023 | [#455](https://github.com/bounswe/bounswe2023group4/pull/455) |
| Writing Tests for the voting page | [#458](https://github.com/bounswe/bounswe2023group4/issues/458) | Ali Nasra | 28.11.2023 | [#470](https://github.com/bounswe/bounswe2023group4/pull/470) |
| Adapting the isOpen Parameter to the voting mechanism | [#473](https://github.com/bounswe/bounswe2023group4/issues/473) | Ali Nasra | 28.11.2023 | [#474](https://github.com/bounswe/bounswe2023group4/pull/474) |
| Preparing the General Test Plan for the 2nd milestone's report| [#485](https://github.com/bounswe/bounswe2023group4/issues/485) | Ali Nasra | 4.12.2023 | [#484](https://github.com/bounswe/bounswe2023group4/pull/484) |
| Solve the misunderstanding of create poll as a user | [#441](https://github.com/bounswe/bounswe2023group4/issues/441) | Enes Furkan Arslan | 28.11.2023 | [#445](https://github.com/bounswe/bounswe2023group4/pull/445)
| Write create poll page tests | [#453](https://github.com/bounswe/bounswe2023group4/issues/453) | Enes Furkan Arslan | 28.11.2023 | [#457](https://github.com/bounswe/bounswe2023group4/pull/457)
| Mobile refactor | [#460](https://github.com/bounswe/bounswe2023group4/issues/460) | Yiğit Şekerci | 28.11.2023 | [PR#461](https://github.com/bounswe/bounswe2023group4/pull/461)
| Improve Mobile flow and design | [#466](https://github.com/bounswe/bounswe2023group4/issues/466) | Yiğit Şekerci | 28.11.2023 | [PR#467](https://github.com/bounswe/bounswe2023group4/pull/467)

## Planned vs. Actual
* [#241](https://github.com/bounswe/bounswe2023group4/issues/241) is still not done because we did not decide how the flow with refresh token happens in the database. As soon as that is finished, this issue will be worked on.
* [#342](https://github.com/bounswe/bounswe2023group4/issues/342) is not finished because before we started working on this, we merged the email verification branch and this caused issues which prevented Şefik from working on this issue in his local database. As soon as this problem is resolved, basic comment feature will be implemented.
* [#366](https://github.com/bounswe/bounswe2023group4/issues/366) [SELIN] [INCOMPLETE]
* [#344](https://github.com/bounswe/bounswe2023group4/issues/344) was closed one day later it was due because of our priorities leading to the 2nd milestone.
* [#399](https://github.com/bounswe/bounswe2023group4/issues/399) was mostly completed, it even has a PR merged. But this issue is not closed because the swagger documentation still does not reflect the endpoints behavior correctly.
* [#400](https://github.com/bounswe/bounswe2023group4/issues/400) was closed 3 days late. The work was done mostly on time, but we didn't close the issue until we made sure that voting works in accordance with the frontend and mobile.
* [#403](https://github.com/bounswe/bounswe2023group4/issues/403) was closed 1 day late. PR was linked on time but reviewing the code took less than 1 day.
* [#405](https://github.com/bounswe/bounswe2023group4/issues/405) was closed 2 days late. PR was linked on time, but reviewing how point system should work for the milestone took 2 days.
* [#409](https://github.com/bounswe/bounswe2023group4/issues/409) [Kutay] [INCOMPLETE]
* [#424](https://github.com/bounswe/bounswe2023group4/issues/424) was completed later than expected due to a misunderstanding pertinent to the deadline of the test plan. A detailed clarification can be found in the comments.
* [#422](https://github.com/bounswe/bounswe2023group4/issues/422) is unfinished because we couldn't organize a frontend backend coordination for the implementation of email verification.
* [#366](https://github.com/bounswe/bounswe2023group4/issues/366) is cancelled since we decided not to prioritize responsiveness tasks. It may reopen after crucial project features are completed.
* [#418](https://github.com/bounswe/bounswe2023group4/issues/418) was on hold to focus on the parts that we will show in the milestone. This week we will focus on this issue and its description will be extended.
* [#415](https://github.com/bounswe/bounswe2023group4/issues/415) was completed later than expected due to forgetting that this task was a multipart task. So the task time was managed efficiently but given deadline did not take into account that different sections would be finished at different times.
  
## Your plans for the next week
| Description | Issue | Assignee | Due | Estimated Duration |
| --- | --- | --- | --- | --- |
| Linking Refresh Token and Users in Database | [#241](https://github.com/bounswe/bounswe2023group4/issues/241) | Şefik Palazoğlu | 12.12.2023 | 2hr |
| Implement Poll Comment | [#342](https://github.com/bounswe/bounswe2023group4/issues/342) | Şefik Palazoğlu | 12.12.2023 | 3hr |
| Swagger Correction for Poll | [#399](https://github.com/bounswe/bounswe2023group4/issues/399) | Şefik Palazoğlu | 08.12.2023 | 1.5hr |
| Researching and implementing the Annotation's UI| [#493](https://github.com/bounswe/bounswe2023group4/issues/493) | Ali Nasra | 20.12.2023 | 8hr |
| Annotation Backend Requirement | [#494](https://github.com/bounswe/bounswe2023group4/issues/494) | Şefik Palazoğlu | 12.12.2023 | 6hr |
| Implement Authentication Token Management Middleware | [#409](https://github.com/bounswe/bounswe2023group4/issues/409) | Kutay Saran | 12.12.2023 | 4hr |
| Implement Forgot Password Page UI | [#497](https://github.com/bounswe/bounswe2023group4/issues/497) | Kutay Saran | 12.12.2023 | 2hr |
| Integration of forgot password functionality | [#496](https://github.com/bounswe/bounswe2023group4/issues/496) | Kutay Saran, Hebun Şimşek | 12.12.2023 | 2hr |
| Integration of email verification | [#495](https://github.com/bounswe/bounswe2023group4/issues/495) | Kutay Saran, Hebun Şimşek | 12.12.2023 | 3hr |
| Implement the UI of moderation-not moderator page from mock up | [#498](https://github.com/bounswe/bounswe2023group4/issues/498)| Enes Furkan Arslan | 12.12.2023 | 2h | 
| Start implementation of general UI of moderation-not jury from mock up | [#499](https://github.com/bounswe/bounswe2023group4/issues/499) | Enes Furkan Arslan | 12.12.2023 | 3h |
| Implement forgot password | [#500](https://github.com/bounswe/bounswe2023group4/issues/500) | Hebun Şimşek | 12.12.2023 | 4h |
| Google Auth Fix | [#501](https://github.com/bounswe/bounswe2023group4/issues/501) | Kutay Saran,Emre Batuhan Göç | 11.12.2023 | 1h |
| Final Milestone Plan for project | [#502](https://github.com/bounswe/bounswe2023group4/issues/502) | Emre Batuhan Göç | 11.12.2023 | 1.5h |
| Implement selected badges in profile endpoints | [#503](https://github.com/bounswe/bounswe2023group4/issues/503) | Emre Batuhan Göç | 12.12.2023 | 2h |
| Implement get poll endpoints for specific polls | [#504](https://github.com/bounswe/bounswe2023group4/issues/504) | Emre Batuhan Göç | 12.12.2023 | 3h |
| Implement moderator endpoints | [#506](https://github.com/bounswe/bounswe2023group4/issues/506) | Emre Batuhan Göç | 12.12.2023 | 6h |
| Fix profile id - user id mismatch bug  | [#507](https://github.com/bounswe/bounswe2023group4/issues/507) | Selin Işık, Emre Batuhan Göç | 12.12.2023 | 1h |
| Update Poll Card UI  | [#508](https://github.com/bounswe/bounswe2023group4/issues/508) | Selin Işık | 12.12.2023 | 2h |
| Update Web Project Color Palette   | [#509](https://github.com/bounswe/bounswe2023group4/issues/509) | Selin Işık | 12.12.2023 | 2h |
| Add Time to Date Select Fields   | [#510](https://github.com/bounswe/bounswe2023group4/issues/510) | Selin Işık | 12.12.2023 | 1.5h |
| Redesign the project name and logo | [#511](https://github.com/bounswe/bounswe2023group4/issues/511) | Selin Işık | 12.12.2023 | 1h |
| Implement Moderation Screen UI| [#418](https://github.com/bounswe/bounswe2023group4/issues/418) | Yiğit Şekerci | 12.12.23 | 6hr |
| Add edit logic to the profile page | [#512](https://github.com/bounswe/bounswe2023group4/issues/512) | Ahmet Emre Şafak | 12.12.23 | 3.5hr |
| Fix profile image related issues in polls | [#513](https://github.com/bounswe/bounswe2023group4/issues/513) | Ahmet Emre Şafak | 12.12.23 | 1hr |
| Implement navigation to other users profile | [#514](https://github.com/bounswe/bounswe2023group4/issues/514) | Ahmet Emre Şafak | 12.12.23 | 2hr |

## Risks
- We will try to implement annotations in the backend this week. We need an annotation server, getting another server might be a problem.

## Task Priority
1. Annotation Implementation. PO has repeatedly asked for our progress for annotation, therefore we definitely need to complete annotation and it should be complete.
1. Semantic Tagging. PO has asked for this feature in the 2nd milestone.
2. Moderation. In accordance with the requirements, this needs to be done so we can reliably open polls.
3. Jury. In accordance with the requirements, this needs to be done so that polls can be closed appropriately.
4. Poll UI improvement. There is some aspects of our poll ui that needs to be improved. An example would be to make closed polls appear differently.
5. Google Authentication Fix. Google authentication needs to work properly. It was mentioned briefly in the milestone.

## Participants
- Ali Nasra
- Ahmet Emre Şafak
- Emre Batuhan Göç
- Enes Furkan Arslan
- Hebun Şimşek
- Kutay Saran
- Selin Işık
- Şefik Palazoğlu
- Yiğit Şekerci
