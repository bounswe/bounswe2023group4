# Cmpe451 Final Project Team Report
#### Prepared by:
**Video:** [Link to video demo](https://drive.google.com/file/d/1fy2uaq-HsBsuccB4LoQ2iyP89jqu962n/view?usp=sharing)

### Executive Summary
Product Overview:
Insight Arena, a cutting-edge mobile and web application, transforms user engagement with prediction polls through its innovative blend of interactivity, social networking, and gamification. It empowers users to participate in a variety of polls, express their views, engage in competitive ladder rankings, and foster community connections.

Functionality:
* Versatile Poll Options: Insight Arena accommodates both discrete and continuous poll types, offering users the flexibility of fixed choices or the freedom of open-ended responses.
* Dynamic User Engagement: The application encourages active participation by allowing users to invest points in polls, creating a vibrant and competitive atmosphere.
* Enhanced Interactivity: Features like commenting, annotations, and personal poll creation enrich the user experience, making interactions more meaningful.
* Customizable User Profiles: Users can personalize their profiles with privacy options. These profiles highlight their poll activities and facilitate community building through a follow feature.
* Visual Personalization: The option to upload profile photos adds a personal touch, allowing users to visually express their identity within the app.
* Competitive Leaderboards: The leaderboard segment showcases user standings across various domains, spurring healthy competition and engagement.
* Semantic Tagging: Advanced, unseen semantic tags enable efficient and relevant poll searches, enhancing user experience in finding topics of interest.
* Engaging Moderator Role: A unique moderator system not only ensures poll accuracy but also rewards moderators with points for their contributions.
  
Technical Description:
* Modern Architecture: Utilizes state-of-the-art technologies like Jetpack Compose, balancing scalability and performance across both mobile and web platforms. The backend adopts a monolithic architecture, with the exception of the Annotation service.
* Principled Code Design: Adheres to SOLID principles, emphasizing separation of concerns for a more organized and maintainable codebase.
* User-Centric Interface: The design follows Material Design guidelines, ensuring a familiar and intuitive user experience.
* Advanced Poll Mechanics: The system incorporates poll types, deadlines, and rejection timelines, facilitating a versatile backend and enhanced user interaction.
* Social Connectivity: Features integrated social networking for user interactions, sharing, and community engagement.
* Cutting-Edge Semantic Search: Employs advanced search technology for swift and relevant poll discovery.
* Robust Moderation System: Implements a sophisticated moderation system incentivizing accurate and active participation.
* Broad Device Support: Accessibility across a wide range of devices maximizes user reach and inclusivity.
* Continuous Performance Benchmarking: Regular performance analysis using tools like Layout Inspector, App Inspection and Build Analyzer ensures optimal app functionality.
* Standardized Git Practices: Adopts industry-standard Git workflows for effective project management and scalability.
* Focused on Security: Initiates code obfuscation and minification strategies to enhance mobile app security even though we couldn't conclude this feature.
* Annotations: Followed industrial standards in our annotation service and made it as a new service.

Conclusion:
Insight Arena stands as a pioneering application in the realm of social polling and predictive analytics. It offers a unique, engaging platform for users to voice their opinions, connect with others, and participate in a wide range of predictive challenges.

### Summary of the project status in terms of requirements.

### Status of Deliverables

| Name        | Status           | Notes  |
| ------------- |:-------------:| -----:|
| [Group Milestone Report](#Cmpe451-Final-Project-Team-Report) | Completed |
| [Progress Based On Teamwork](#Progress-based-on-teamwork)    | Completed |
| [API Endpoints](#API) | Completed | We have a [swagger documentation](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/api-docs/) |
| [User Interface / User Experience](#User-Interface--User-Experience) | Completed |
| [Annotations](#Annotations) | 90% Completed | Only the basics of W3C WADM is implemented |
| [Scenario](#Scenario) | Completed |
| [Use and Maintenance](#Use-and-Maintenance)| Completed |
| [Individual Milestone Reports](#Individual-Reports) | Completed |

### Final release notes

### Management

#### Implemented Changes and their impact

* After Milestone 1 and Milestone 2 our team decided to prioritize the functionality of the platform and the features that are most important (annotations, semantic search etc.) according to the project owner. By doing this, the progress of the team in terms of requirements and features gained important speed and most of the requirements and requested features are implemented before the final milestone.

#### Reflactions related to the Final Milestone Demo

* In final milestone demo we believe we did a great job in terms of presentation and demonstrating the new features added after milestone 2. We also answered the questions about the platform necessarily.

#### Lessons Learned in the Final Milestone Demo

* In the final milestone we learned that even if we are not able to prevent users from certain actions which are not suitable with the platform goals (like using annotations as a comment section), it is not a good idea to show it in the demo. Also, during the presentation answering to the PO's questions should not be in the form of arguing. A weak side of the platform, if any, is not supposed be defended against the audience.

#### What could have been done differently

* From the beginning of the project, we could have focused on the functionality and requirements more, because we kind of ran out of time by implementing nearly perfect features which is not required after all. For instance; If a good UI takes 4 hours, trying to make it perfect takes another 4 hours.
* After milestone 1 and milestone 2 we could have an extra meeting to talk about feedbacks and organize new tasks. Our work between milestones and the next tuesday meetings was not well organized and we believe those times were crucial for the progress of the project.

### Progress based on teamwork

#### Summary of work performed by each member
| Member | Group | Subgroup | Summary of Work |
| :---: | :-------------: |:-------------:| :-----:|
| Enes Furkan Arslan | 4 | Frontend | Involved in a lot of processes in this project from management to implementation aspects. Some of the management related contributions are preparing **new RAM and communication plan**, taking part in division of team into subteams, deciding on the technologies to be used on frontend with front team, **updating mock-up designs**, **updating requirements based on feedbacks from PO**, organizing extra meetings for ongoing tasks and keep checking the progress of other tasks and reviewing them. About implementation part, implemented the **sign up page**, **create poll page**, **moderation-not-moderator page** and **moderation-not-jury page** UIs together with their backend connections to make them functional. Also **tested** and corrected all of these pages' functionalities manually with possible scenarios after implementation. Also implemented **unit tests** for these pages. Other than these, took urgent tasks like bug and error fixing in the project and get them completed. |
| Ali Nasra | 4 | Support | Over the last 4 months, I have revised both the design requirements and the UML diagrams, compiled each subteam's plan, and amalgamated them into a single general plan In addition, I partook in the preparation of each milestone report. For instance, in this report, I was responsible for shooting the demo video and writing the scenario. My contributions to the code base vacillate between my front-end and back-end duties. As an associate of the frontend subteam, I was responsible for implementing multiple pages such as the **sign-in** page, the **vote** page, and the **leaderboard** page with their concomitant backend integration. In addition, I was responsible for implementing the annotations' UI and integrating it with the Annotation server in a **W3C-compliant** manner. As an associate of the backend subteam, I was responsible for implementing the member follow/unfollow mechanisms. In addition, I implemented the leaderboard back-end endpoints. Finally, I implemented the functionality that helps update the badges of each user given their up-to-date standing in each topic.|
| Şefik Palazoğlu | 4 | Backend | Throughout the project I was tasked with creating backend API endpoints and maintaining them accoring to our use cases. I implemented poll related API endpoints whic relate to creation and retrieval of Poll data. I also was involved in deployment and dockerization of the backend. We used mySql for our database for the core application. I was tasked with creating schemas that reflect our business needs for polls and various other entities. I have overseen the **Annotation** part of the project. I was tasked with creating endpoints related to creation, retrieval, and deletion of Annotation objects. I made sure that the objects that were passed around were compliant with json-ld Annotation W3C format. I also created the automatic domain specific tagging system with help from Facebook's zero-shot classification API. Finally, I did semantic search endpoints for searching words and retrieving related semantic tags and searching words and retrieving related semantically tagged polls. |

#### Requirements Coverage
| ID | Name        | Status           | Notes  |
| --- | ------------- |:-------------:| -----:|
| RID      | Specification | Status | Optional notes |
| ...     | ...      |   ... | ... |

(Status: One of: Not done , Completed , % completed )

# API
* [API Link](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/api-docs/)
* [Example Poll GET](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/api-docs/#/polls/get_polls__pollId_)
  ```
  curl -X 'GET' \
  'http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/polls/5' \
  -H 'accept: application/json'
  ```
* [Example Multiple Choice Poll Post](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/api-docs/#/polls/post_polls_discrete)
  ```
  curl -X 'POST' \
      'http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/polls/discrete/' \
  '{
    "question":"Which nominee will win the Best Motion Picture in Drama in the upcoming Golden Globe Awards?",
    "openVisibility":false,
    "choices":
    [
  	  "Anatomy of a Fall",
      "Killers of the Flower Moon",
      "Maestro",
      "Oppenheimer",
      "Past Lives",
      "The Zone of Interest"
     ],
     "setDueDate":true,
     "dueDatePoll":"2024-01-07T00:00:00.000Z",
     "numericFieldValue":"1",
     "selectedTimeUnit":"day"
  }'
  ```
* [Example Discrete Poll Vote](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/api-docs/#/polls/post_polls_discrete__pollId__vote)
   ```
  curl -X 'POST' \
      'http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/polls/discrete/4/vote' \
  '{"choiceId":10,"points":500}'
  ```
### Notes
Please keep in mind that for POST endpoint we implemented authorization, so these calls may not be replicaple if you are not logged in to your account.

# User Interface / User Experience

## Mobile

**Feature: Sign Up Page**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/39b6f272-d7d3-4a5b-b7a4-1f17515a00a6" width="50%" />

**Source Code:** [Sign Up Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/signup/SignupScreen.kt)

---

**Feature: Share URL**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/fbe814a6-26ae-44ec-885f-3096d2ec8ccb" width="50%" />

**Source Code:** [Share URL Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/utils/ContextUtils.kt)

---

**Feature: Poll Details**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/1bd786e7-8d6a-4954-a274-18091ca2aea3" width="50%" />

**Source Code:** [Poll Details Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/vote/PollVoteScreen.kt)

---

**Feature: Others' Poll**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/1fa928f3-a952-4827-8df4-d20a516675d1" width="50%" />

**Source Code:** [Others' Poll Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/profile/MyProfileScreen.kt)

---

**Feature: My Profile**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/88c2c7c7-691e-422b-acd3-f49007efc463" width="50%" />

**Source Code:** [My Profile Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/profile/ProfileScreen.kt)

---

**Feature: Moderation**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/7c86fbaa-e9fd-4d2a-9eff-1d0d5635f61d" width="50%" />

**Source Code:** [Moderation Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/moderation/apply/ModerationApplyScreen.kt)

---

**Feature: Login Page**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/44607420-cb76-4696-a35f-ab5c5ff2292e" width="50%" />

**Source Code:** [Login Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/login/LoginScreen.kt)

---

**Feature: Login Field Page**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/ad1294ad-9b38-439e-922f-810142430819" width="50%" />

**Source Code:** [Login Field Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/login/LoginScreen.kt)

---

**Feature: Leaderboard**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/a3bd30d6-004a-472a-a8e7-c632fc0228bd" width="50%" />

**Source Code:** [Leaderboard Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/leaderboard/LeaderboardScreen.kt)

---

**Feature: Feed Screen**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/623446df-78f0-4be8-b4fc-39844e4312a9" width="50%" />

**Source Code:** [Feed Screen Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/feed/FeedScreen.kt)

---

**Feature: Edit Profile**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/fefd4341-0738-45d8-aa96-79cfe7f77eb4" width="50%" />

**Source Code:** [Edit Profile Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/editProfile/EditProfileScreen.kt)

---

**Feature: Drawer**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/08484f6d-078c-426d-8bf4-2fe2673867e9" width="50%" />

**Source Code:** [Drawer Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/common/NavigationDrawer.kt)

---

**Feature: Create Poll**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/7695bd73-3ed0-4275-9560-97869c03e368" width="50%" />

**Source Code:** [Create Poll Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/create/CreatePollScreen.kt)

---

**Feature: Annotations**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/b59a19d1-f922-4b7a-be5a-c025f1aaf1b4" width="50%" />

**Source Code:** [Annotations Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/common/annotation/AnnotatableText.kt)

---

**Feature: Annotate**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/f261508c-84ea-47e6-9fb6-847033245c83" width="50%" />

**Source Code:** [Annotate Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/common/annotation/AnnotatableText.kt)

---

**Feature: Moderation Screen**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/b8f7c7ab-3473-4e83-a212-1d84b7ed32ff" width="50%" />

**Source Code:** [Moderation Screen Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/moderation/list/ModerationScreen.kt)

---

**Feature: Moderation Resolve Screen**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/ee0c7eb6-9301-4157-b1e2-a4a8db70204d" width="50%" />

**Source Code:** [Moderation Screen Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/moderation/list/ModerationScreen.kt)

---


## Web

**Feature: Sign Up Page**

***Sign Up Page***

<img width="1512" alt="SignUp" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/e30b9e7f-1197-41c0-b26c-9c411f9454c6">

***Platform Terms Pop Up***


<img width="1512" alt="SignUpPopUp" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/0914b6cf-8aa4-4643-a1dd-cdc7799192e5">



**Source Code:** [Sign Up Page Source Code]
(https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Auth/SignUp/index.jsx)

---

**Feature: Sign In Page**

<img width="1512" alt="SignIn" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/b874b705-4b37-418f-929a-c343fac315ca">


**Source Code:** [Sign In Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Auth/SignIn/index.jsx)

---

**Feature: Forgot Password Page**
<img width="1512" alt="Reset P" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/03d226bc-5c49-4014-ac5c-4a42e664f890">



**Source Code:** [Forgot Password Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Auth/ForgotPassword/index.jsx)

---

**Feature:Feed Page**

***Guest User***

![Feed Guest](https://github.com/bounswe/bounswe2023group4/assets/56879777/bf01abc1-2308-4cda-bd49-8744d9ee468b)

***Member***

<img width="1512" alt="FeedUser" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/31b6f523-f437-4e6a-89bb-7389203d560e">


**Source Code:** [Feed Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Feed/index.jsx)

---

**Feature: Profile Page**

***Guest User Looks A Members Profile***
<img width="1512" alt="OtherUserProfile" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/e40c6fd9-d2c6-4f13-91fc-e32a6bb81340">


***Member Looks His/Her Own Profile***

<img width="1512" alt="Profile Me" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/0c1ff3c0-6a37-4b4f-beb3-2d3ef242f210">


**Source Code:** [Profile Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Profile/index.jsx)

---

**Feature: Edit Profile Page**

<img width="1512" alt="Edit Profile" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/6588d2f9-0b2b-462e-8216-8f73efd232db">


**Source Code:** [Edit Profile Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/EditProfile/index.jsx)

---

**Feature: Vote Page**

***Vote Poll***

<img width="1512" alt="Vote" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/cfb4cbfa-014f-41ae-81d1-edf74713f382">

***Add Annotation***

<img width="1512" alt="Annotation Add" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/b6257a37-9aad-4ad9-ba27-60df501be6fe">

***All Annotations***

<img width="1512" alt="Annotation List" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/35aaefbe-97b6-4c29-b410-90db0c7cc438">


  **Source Code:** [Vote Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Vote/index.jsx)

---

**Feature: Voted Polls Page**

<img width="1512" alt="Voted Polls" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/a0d9a14a-4fa0-4989-b903-a2a2befa908a">



  **Source Code:** [Voted Polls Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Vote/voteList.jsx)

---

**Feature: Create Page**

<img width="1512" alt="Create" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/e3d4b0f0-2288-4207-92a3-fc65a898f313">



  **Source Code:** [Create Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Create/index.jsx)

---

**Feature: Moderation Page**

***Moderation Apply***

<img width="1512" alt="ApplyModeration " src="https://github.com/bounswe/bounswe2023group4/assets/56879777/068f2abe-f6bb-455d-af0d-f485e181ad9d">


***Moderation request list***


<img width="1512" alt="ModeratorPage" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/23aad339-900e-4fcd-96bc-d08acd56aec8">


  **Source Code:** [Moderation Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Moderation/index.jsx)

---

**Feature: Jury Page**

<img width="1512" alt="Jury Req" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/bf86f427-8037-483f-b11a-57201cb95a7b">


  **Source Code:** [Jury Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Jury/index.jsx)

---

**Feature: Leaderboard Page**

<img width="1512" alt="Leaderboard" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/19105aef-f8f4-41ee-9a85-e1a1e7b61131">


  **Source Code:** [Leaderboard Page Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Pages/Leaderboard/index.jsx)

---

**Feature: Comment Pop Up**

<img width="1512" alt="Comment" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/db4a41c4-299c-4242-bdf4-07ae47189cee">


  **Source Code:** [Comment Pop Up Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Components/Modals/CommentModal.jsx)

---

**Feature: Share Pop Up**

<img width="1512" alt="Share" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/d79165be-ea45-42d3-ad31-f4304ebe1ac5">


  **Source Code:** [Share Pop Up Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Components/Modals/ShareModal.jsx)

---

**Feature: Report Pop Up**

<img width="1512" alt="Report" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/a5528b5d-5d3b-4530-9278-334d3800f670">


  **Source Code:** [Report Pop Up Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Components/Modals/ReportModal.jsx)

---

**Feature: Jury Rules Pop Up**

<img width="1512" alt="Jury Pop up" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/2bdf95d3-5037-4a09-9c7f-92882603b2cb">



  **Source Code:** [Jury Rules Pop Up Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Components/Modals/JuryModal.jsx)

---

**Feature: Follower Pop Up**


<img width="1512" alt="Follower" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/baee991d-9ea6-4fa0-8f47-4bfcb03bba7e">


  **Source Code:** [Follower Pop Up Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Components/Modals/FollowerModal.jsx)

---

**Feature: Following Pop Up**


<img width="1512" alt="Following" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/3c71fc4a-7426-4c22-9e3c-c703c9b30328">



  **Source Code:** [Following Pop Up Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Components/Modals/FollowingModal.jsx)

---

**Feature: Poll Category Pop Up**

<img width="1512" alt="PollCategory" src="https://github.com/bounswe/bounswe2023group4/assets/56879777/4ff858de-e7ca-48d5-8c50-2119bd3f800d">


  **Source Code:** [Poll Category Pop Up Source Code](https://github.com/bounswe/bounswe2023group4/blob/main/prediction-polls/frontend/src/Components/Modals/PollTagModal.jsx)

---


# Annotations
* Status: Mostly done. See [api-docs](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:4999/api-docs/).
* Compliance with W3C WADM:

  We support the basic parts of [W3C WADM](https://www.w3.org/TR/annotation-model/) like embedded bodies and basic selectors.
  
  We support [embedded Textual Body](https://www.w3.org/TR/annotation-model/#embedded-textual-body) for the body of the Annotation. For target, we support:
  * [CSSSelector](https://www.w3.org/TR/annotation-model/#css-selector)
  * [XPathSelector](https://www.w3.org/TR/annotation-model/#xpath-selector)
  * [TextQuoteSelector](https://www.w3.org/TR/annotation-model/#text-quote-selector)
  * [TextPositionSelector](https://www.w3.org/TR/annotation-model/#text-position-selector)
  * [Fragment Selector for images](https://www.w3.org/TR/annotation-model/#fragment-selector:~:text=best%2Dpractices%5D.-,Example,-EXAMPLE%204%3A%20IRIs)

  With selectors, we mostly use the TextQuoteSelector when annotating textual content in our use case.

  When it comes to images, we use xywh values appended to the resource as explained above.
* Implementation description

  We have an node.js express app which has 4 endpoints.
  * A general GET endpoint for retrieving multiple Annotations. This can be queried with target and creator to get Annotations related with that target and/or creator.
  * A POST endpoint for posting Annotations. This has validation that checks if the sent body conforms to Annotation json-ld format.
  * A GET endpoint with the specific ID of the Annotation. The ID is given randomly by the server
  * A DELETE endpoint with the specific ID of the Annotation. This is not used much, created for mostly administrative purposes.

  We use mongoDB for our database since it allows easily storing and retrieving JSON-like data.
* API calls examples to annotation server:
  * textual annotation creation & retrieval
    * [retrieval](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:4999/api-docs/#/default/get_annotations__id_)
    ```
    curl -X 'GET' \
    'http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:4999/annotations/6585ea616b03ab2c6b8c535f' \
    -H 'accept: application/ld+json'
    ```

    * [creation](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:4999/api-docs/#/default/post_annotations)

    ```
    curl -X 'POST' \
      'http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:4999/annotations' \
      -H 'accept: */*' \
      -H 'Content-Type: application/ld+json' \
      -d '{
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "type": "Annotation",
      "target": {
        "source": "http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/vote/43",
        "selector": {
          "type": "TextQuoteSelector",
          "exact": "anotation",
          "prefix": "this is an ",
          "suffix": " that has some"
        }
     },
      "body": {
        "type": "TextualBody",
        "value": "This seems to be a typo.",
        "format": "text/plain"
     },
     "creator": "http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/profile/ghostDragon"
    }'
    ```
  * image annotation creation & retrieval
    * [retrieval](http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:4999/api-docs/#/default/get_annotations__id_) is the sane
    ```
    curl -X 'GET' \
    'http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:4999/annotations/6585ea616b03ab2c6b8c535f' \
    -H 'accept: application/ld+json'
    ```
    * creation
    ```
    {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "type": "Annotation",
      "target": "http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/profileImage1#xywh=100,100,300,300",
      "body": {
        "type": "TextualBody",
        "value": "I like this content!",
        "format": "text/plain"
      },
      "creator": "http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/profile/ghostDragon"
    }
    ```
    

# Scenario:
A seasoned insight-arena user and an inveterate gambler, Batuhan logs into the system using his credentials.
1. He is interested in the upcoming Presidential Elections. In order to find the relevant polls in his extensive feed, he types relevant keywords such as **POTUS**.
2. He finds a discrete poll that might interest him. Among the choices, he finds **Biden** and **Trump**. Since the term **Biden** might be confusing for many voters, as many members of the Biden Family are prominent members of the Democratic Party, he voluntarily decides to annotate **Biden** as **Joe Biden the incumbent U.S. president**.
3. He picks Biden and bets 1000 pts in this poll.
4. By virtue of his senior standing on the platform, he has been receiving a lot of jury invitations. He is interested in political polls so he would be a sitting jury in a poll about the prospects of the **AfD** in the upcoming German Elections. He will vote in favor of an option and leave.
5. As a political savvy, Batuhan is interested in befriending the top-scoring users in the political polls. He checks the leaderboard, skim their names, visits their profiles, and follows the ones he is interested in.

In order to implement those features, an immense and meticulous effort has been exerted. 
1. This feature relies on semantic search. When creating polls, users assign semantic tags to each poll. Hence, when the users type in search keywords, they are semantically compared with the predefined semantic tags using Wikidata API. It has been a recommended feature by the PO who believed in its viability.
2. A lot of research was rudimentary to render the annotation implementation **W3C-compliant**. In addition, facilitating the highlighting and the rendering of the annotation instances required careful study of multiple UI options offered by the **antd** library.
3. Expediting voting and making predictions is the main objective of the API. A lot of discussions were held in order to determine the nature of the polls. It was decided that the polls would be either discrete, supporting multiple choices, or continuous, supporting either date or numerical entries.
4. In order to implement a fair system which safeguards the API's credibility, it was decided that a jury of veteran users will be convened in order to decide on the conclusion of the poll and vindicate the correctness of an outcome. Every user can apply to the jury, and his/her request shall be processed accordingly.
5. As a quasi-social network platform, the API allows users to socialize with each other. During our discussion with the PO, it envisaged that the users should be able to seek out each other on the basis of common interests. The leaderboard serves this purpose by allowing users to fetch the most invested users per each polling genre which is determined by its ubiquitous permeance across the internet. 

# Use and Maintenance

## Project Artifacts

### Unit Test Reports

#### Frontend

##### Create Component Unit Test Report

![image](https://github.com/bounswe/bounswe2023group4/assets/110101098/6873f2e6-a033-426d-a2d2-f217818a0af7)

- Overview:
The Create component is a React component responsible for facilitating the creation of polls. This documentation outlines the unit tests written to ensure the robustness and correctness of the Create component.
- Dependencies:
React Testing Library
Mock data for testing
- Running Tests:
npm test Create.test.js 
- Test Descriptions:
- Basic Rendering:
Description: Tests if the Create component renders without crashing.
Positive Scenario: The component renders successfully without any errors.
Negative Scenario: The component fails to render, resulting in errors.
- Input Handling:
Description: Tests user input handling, specifically the ability to fill the question input.
Positive Scenario: User successfully inputs a question, and the component updates accordingly.
Negative Scenario: Input change does not reflect in the component state.
- Poll Type Selection:
Description: Tests the ability to select between multiple choice and customized poll types.
Positive Scenario: User can successfully switch between multiple choice and customized poll types.
Negative Scenario: Poll type selection does not update the component state as expected.
- Customized Type Selection:
Description: Tests the ability to select date or numeric when customized is chosen as the poll type.
Positive Scenario: User can select date or numeric when customized poll type is chosen.
Negative Scenario: Customized type selection does not update the component state correctly.
- Due Date Handling:
Description: Tests the functionality of setting a due date.
Positive Scenario: User can successfully set a due date, and the component state is updated accordingly.
Negative Scenario: Due date setting does not update the component state as expected.
- Choice Management:
Description: Tests the addition and deletion of choices when multiple choice is selected.
Positive Scenario: User can add choices, and the component state reflects the changes.
Negative Scenario: Adding choices does not update the component state correctly.
- Visibility Options:
Description: Tests the ability to open distribution visibility.
Positive Scenario: User can successfully open distribution visibility, and the component state is updated.
Negative Scenario: Visibility option does not update the component state correctly.
- Submission:
Description: Tests the submission of a poll.
Positive Scenario: User can successfully submit a poll, and the component navigates to the feed page.
Negative Scenario: Poll submission fails, and the component does not navigate as expected.

### Vote Unit Test Report

![image](https://github.com/bounswe/bounswe2023group4/assets/52269552/ff5333a8-568b-45f0-a8ac-3b8798319bfe)

- **Overview:**
The Vote Unit is responsible for checking the responsiveness and consistency of the UI's interaction with the users during the voting process.
- **Dependencies:**
    - React Testing Library 
    - Ant Design components 
    - Mock data for testing 
- **Running Tests:**
npm test Vote.test.js
- **Test Descriptions:**
- **Backend connection:**
    - Description: Tests if the UI can render the mock poll whose ID is 1 with no errors.
    - Positive Scenario:  A response message writing "How many points do you want to place?" should appear, indicating the poll is rendered correctly. 
    - Negative Scenario: The expected response doesn't appear.
- **Discrete poll rendering:**
    - Description: Tests if the UI can render the mock poll whose ID is 4 with no errors.
    - Positive Scenario: A response message writing "Choose the option you want to vote for" should appear.
    - Negative Scenario: The expected response doesn't appear.
- **Continuous poll rendering:**
    - Description: Tests if the UI can render the mock poll whose ID is 5 with no errors.
    - Positive Scenario: A response message writing "Please enter a suitable answer to the poll" should appear.
    - Negative Scenario: The expected response doesn't appear.
- **Betting mechanism:**
    - Description: Tests if the non-numeric betting points are handled or not.
    - Positive Scenario: A response message writing "The bet points should be integer numbers!" should appear.
    - Negative Scenario: The expected response doesn't appear.
- **Empty vote or erroneous vote handling:**
    - Description: Tests the response of the UI in case the user doesn't type or select any option. Note that since poll 5 is a continuous numeric poll, it accepts only numeric answers
    - Positive Scenario: A response message writing "The response should be numeric!" should appear.
    - Negative Scenario: The expected response doesn't appear.
 

##### SignUp Component Unit Test Report

![image](https://github.com/bounswe/bounswe2023group4/assets/110101098/be7d57aa-7aa4-4f0d-afce-ca15224307e3)

- Overview:
The SignUp component is a React component responsible for facilitating the user sign-up process. This documentation outlines the unit tests written to ensure the robustness and correctness of the SignUp component. 
- Dependencies:
React Testing Library 
Ant Design components 
Mock data for testing 
- Running Tests: 
npm test SignUp.test.js
- Test Descriptions:
- Basic Rendering:
Description: Tests if the SignUp component renders without crashing and if essential UI elements are present.
Positive Scenario: The component renders successfully without any errors, and essential UI elements are present.
Negative Scenario: The component fails to render, or essential UI elements are missing.
- Form Input Handling:
Description: Tests user input handling for email, username, password, and birthday fields.
Positive Scenario: User input changes are correctly reflected in the component state.
Negative Scenario: Input changes do not reflect in the component state.
- Form Submission:
Description: Tests the submission of the sign-up form.
Positive Scenario: User can successfully submit the sign-up form, and the component responds accordingly.
Negative Scenario: Form submission fails, and the component does not respond as expected.

##### SignIn Component Unit Test Report

![image](https://github.com/bounswe/bounswe2023group4/assets/52269552/f3376a2a-3a56-4cf6-9a9a-d068e56fb092)

- Overview:
Those tests were designed to confirm the functionality of the Sign-In unit. 
- Dependencies:
React Testing Library 
Ant Design components 
Mock data for testing 
- Running Tests: 
npm test Signin.test.js
- Test Descriptions:
- Sign-in page Rendering:
    - Description: Tests if the form which includes the input fields for both the username and password is rendered.
    - Positive Scenario: The form is rendered successfully.
    - Negative Scenario: The form misses key components.
- Form Input Handling:
   - Description: Tests if the form's input fields' values are editable.
   - Positive Scenario: Their values change upon user input.
   - Negative Scenario: Their values don't change upon user input.
- Form Submission Handling:
   - Description: Tests if the form can be submitted successfully.
   - Positive Scenario: A click event is fired. Upon the correctness of the input, the user logs in or stays on the page.
   - Negative Scenario: The button doesn't respond, and now discernible change in UI is perceived.


##### Moderation-Not-Moderator Component Unit Test Report

![image](https://github.com/bounswe/bounswe2023group4/assets/110101098/a3de3323-37e3-48c1-9870-4b6608f0111a)

- **Overview**:
  - This unit test focuses on verifying the behavior of the Moderation component in the non-moderator view. Two specific scenarios are tested: rendering the non-moderator view correctly and handling the "apply to become a moderator" button click.

- **Test Environment**:
  - React 
  - Testing Library
  - Jest 
- **Test Cases**:
- **renders the non-moderator view correctly**
  - Description: This test ensures that the Moderation component renders the non-moderator view correctly. The component should display a message inviting users to apply to become a moderator and a corresponding "Apply" button.
  - Positive scenario: The component renders successfully without any errors, and essential UI elements are present.
  - Negative scenario: The component fails to render, or essential UI elements are missing.
- **handles the "apply to become a moderator" button click**
  - This test checks whether the Moderation component correctly handles the click event on the "Apply" button. It simulates a button click, spies on a mock API call, and ensures that the API call is made.
  - Positive scenario: User can successfully apply to become a moderator with button click, and the component responds accordingly.
  - Negative scenario: Button click fails, and the component does not respond as expected.

##### Moderation-Not-Jury Component Unit Test Report

![image](https://github.com/bounswe/bounswe2023group4/assets/110101098/146b3f2a-29c5-4df2-8170-17ac15b04969)

- **Overview**:
  - The purpose of this unit test is to verify the correct rendering of the Moderation component in a moderator view. The component receives props such as tags and moderatorPosts, and the test ensures that the component renders as expected.

- **Test Environment**:
  - React 
  - Testing Library
  - Jest 
- **Test Cases**:
- **renders the moderator view correctly**
  - Description: This test aims to verify that the Moderation component renders the moderator view correctly when provided with tags and moderator posts.
  - Positive scenario: The Moderation component should render without errors, displaying the moderator view with the provided tags and moderator posts.
  - Negative scenario: The component fails to render, or essential UI elements are missing.

- **Important Notes**:
    - Expanding this test suite to cover additional scenarios, such as user interactions or edge cases would be beneficial but they had to be tested manually because of time constraints of the project.


 ### Profile Unit Test Report
![Screenshot 2023-12-01 145439](https://github.com/bounswe/bounswe2023group4/assets/56879777/2235e432-ea8d-4f95-9423-7789848037d8)

 - **Overview:**
The Profile Component Test ensures the correct functionality and user interaction with the Profile component in a React application. It validates various scenarios, including profile rendering for logged-in and other users, navigation to the edit profile page, and profile picture display.
- **Dependencies:**
    -React Testing Library: For rendering components and interacting with the DOM.
    -Jest: Used as the test runner and for mocking functions and modules.
    -React Router DOM: For handling routing in tests.
    -MemoryRouter: Provides routing context for testing.
    -Mock Data: Simulates API responses.
- **Running Tests:**
npm test Profile.test.js
- **Test Descriptions:**
- **Rendering Profile for Logged-in User:**
    - Description: Verifies the rendering of the profile for the logged-in user.
    - Positive Scenario: Username and "Edit Profile" button should be displayed.
    - Negative Scenario: Absence of the expected username or "Edit Profile" button.
- **Rendering Profile for a Different User:**
    - Description: Checks if another user's profile is correctly rendered.
    - Positive Scenario: "Follow" button should be visible.
    - Negative Scenario: "Follow" button not appearing.
- **Navigating to Edit Profile Page:**
    - Description: Ensures navigation to the edit profile page upon clicking the "Edit Profile" button.
    - Positive Scenario: mockNavigate called with the correct URL.
    - Negative Scenario: Incorrect or no call to mockNavigate.
- **Rendering Profile Picture:**
    - Description: Tests the rendering of the profile picture when available.
    - Positive Scenario: Profile image with correct src attribute.
    - Negative Scenario: Profile image not present or incorrect src.
- **Additional Notes:**
    - Mock functions and local storage are reset after each test for isolation.
    - Uses waitFor and act from React Testing Library for asynchronous operations and user interactions.


 ### Edit Profile Unit Test Report

  ![Screenshot 2023-12-01 145514](https://github.com/bounswe/bounswe2023group4/assets/56879777/f0d21226-5513-4e17-a44f-ad9f053deb1b)
- **Overview:**
The EditProfile Component Test Suite is designed to ensure the correct functionality and user interactions within the EditProfile component of a React application. This suite tests the component's ability to render, handle image uploads, navigate after updates, and interact with API endpoints.

- **Dependencies:**
    - React Testing Library: For rendering components and interacting with the DOM in tests.
    - Jest: Used as the test runner and for mocking functions and modules.
    - React Router DOM and MemoryRouter: For handling routing functionalities in tests.
    - Mock Data: For simulating API responses and user interactions.
    - Jest Mock Functions: To mock global functions and API calls.
- **Running Tests:**
npm test EditProfile.test.js
- **Test Descriptions:**
- **Rendering and API Call Check:**
    - Description: Verifies if the component renders correctly and makes an API call to fetch user data.
    - Positive Scenario: The username field should display the fetched username.
    - Negative Scenario: The username field does not display the fetched username or API call fails.
- **Image Upload Handling:**
    - Description: Tests the functionality of the image upload feature.
    - Positive Scenario: The profile image source should update to reflect the uploaded image.
    - Negative Scenario: The profile image source does not update after the image upload.
- **Navigation After Update:**
    - Description: Ensures the component navigates to the profile page after a successful profile update.
    - Positive Scenario: mockNavigate is called with the correct URL after profile update.
    - Negative Scenario: Navigation does not occur or incorrect URL is used.
- **Form Submission and API Update Call:**
    - Description: Tests the form submission and the subsequent API call for profile updates.
    - Positive Scenario: The updateProfile API is called with the correct data upon form submission.
    - Negative Scenario: The API call is not made or is made with incorrect data.
- **Additional Notes:**
    - Mock functions, local storage, and global functions like window.matchMedia are reset after each test to ensure test isolation.
    - The test suite utilizes waitFor, fireEvent, and act from React Testing Library for handling asynchronous operations, user interactions, and DOM updates.

## Backend
### Authentication unit tests
Authentication endpoints are tested with mock data. Since the logic is in AuthenticationService class the tests are written for it. Every endpoint is tested for success and failure cases.
### Poll unit tests
The PollService functions are tested for their success and failure cases. Only the pollClose function is not tested fully since it was implemented recently.
### Profile unit tests
Profile endpoints are tested with mock data. Since the logic is in ProfileService class the tests are written for it. Every endpoint is tested for success and failure cases.
## Mobile

### UI Tests
* Custom input field tests are written to ensure the input fields working properly across the whole app.
* Error dialog test is written to ensure dialog's behavior when the error occurs.
* Drawer tests are written to ensure robust navigation in app.
* Login page, signup page and main screen designs are tested to have desired ui.

### Unit Test
Unit test prep:
* All required data objects in viewmodels are initialized with mock data to intervene the dependency injection process.
* Non testable classes are abstracted with interfaces to make them testable.

Unit tests:
* We have written tests for our extension functions. (for example String.isValidDate())
* We have written tests for our date formatter that we are using across the app.
* We have written the tests for feed, profile usecases to ensure them they fetch the data as expected.
* We have written the tests for create poll, login and signup pages' viewmodels to ensure their events trigger correct state changes in the model.

# Individual Reports
## Member: Ali Nasra
### Responsibilities: 
Throughout the project, my responsibilities encompassed multiple facets of the projects. Managerially, I was responsible for tracking the group's plan and confirming compliance with it. Technically, I served as a member of the support subteam which allowed me to contribute to both the backend and frontend subteams.
### Main contributions:
Over the last 4 months, I have revised both the design requirements and the UML diagrams, compiled each subteam's plan, and amalgamated them into a single general plan In addition, I partook in the preparation of each milestone report. For instance, in this report, I was responsible for shooting the demo video and writing the scenario. My contributions to the code base vacillate between my front-end and back-end duties. As an associate of the frontend subteam, I was responsible for implementing multiple pages such as the **sign-in** page, the **vote** page, and the **leaderboard** page with their concomitant backend integration. In addition, I was responsible for implementing the annotations' UI and integrating it with the Annotation server in a **W3C-compliant** manner. As an associate of the backend subteam, I was responsible for implementing the member follow/unfollow mechanisms. In addition, I implemented the leaderboard back-end endpoints. Finally, I implemented the functionality that helps update the badges of each user given their up-to-date standing in each topic.
### Overall description:
#### Code-related significant issues:
|Task|Issue link(s)|
|---|----|
|Researching the fundamental Front-end technologies|[#187](https://github.com/bounswe/bounswe2023group4/issues/187),[#188](https://github.com/bounswe/bounswe2023group4/issues/188),[#189](https://github.com/bounswe/bounswe2023group4/issues/189),[#190](https://github.com/bounswe/bounswe2023group4/issues/190),[#191](https://github.com/bounswe/bounswe2023group4/issues/191),[#192](https://github.com/bounswe/bounswe2023group4/issues/192)|
|Sign-in page UI Implementation|[#205](https://github.com/bounswe/bounswe2023group4/issues/205)|
|Sign-in page Backend Integration|[#257](https://github.com/bounswe/bounswe2023group4/issues/257)|
|The Implementation of the Voting Page UI|[#304](https://github.com/bounswe/bounswe2023group4/issues/304)|
|Integrating the Vote Page UI with the back-end server|[#347](https://github.com/bounswe/bounswe2023group4/issues/347)|
|Writing Tests for the Voting Page |[#458](https://github.com/bounswe/bounswe2023group4/issues/458)|
|Annotation: UI Research and implementation |[#493](https://github.com/bounswe/bounswe2023group4/issues/493)|
|Annotation UI: Deciding on the JSON structures for data communication |[#520](https://github.com/bounswe/bounswe2023group4/issues/520)|
|Researching various UI components for Annotation UI implementation|[#518](https://github.com/bounswe/bounswe2023group4/issues/518),[#519](https://github.com/bounswe/bounswe2023group4/issues/519),[#573](https://github.com/bounswe/bounswe2023group4/issues/573)|
|Documenting my research results |[#542](https://github.com/bounswe/bounswe2023group4/issues/542)|
|Connecting the backend-server to the annotation UI |[#532](https://github.com/bounswe/bounswe2023group4/issues/532)|
|Implementing the "follow User" functionality in the Backend |[#541](https://github.com/bounswe/bounswe2023group4/issues/541)|
|Implementing the Point system in the backend|[#590](https://github.com/bounswe/bounswe2023group4/issues/590)|
|Implementing the Annotation UI for images|[#592](https://github.com/bounswe/bounswe2023group4/issues/592)|
|Leaderboard : UI Interface & Backend connection|[#630](https://github.com/bounswe/bounswe2023group4/issues/630)|
#### Management-related significant issues:
|Task|Issue link(s)|
|---|----|
|Revising and updating the Poll System Sequence Diagrams|[#147](https://github.com/bounswe/bounswe2023group4/issues/147)|
|Merging all subteams' plans|[#324](https://github.com/bounswe/bounswe2023group4/issues/324)|
|Preparing the General Test Plan|[#485](https://github.com/bounswe/bounswe2023group4/issues/485)|
#### Pull requests:
|Task|PR link(s)|
|---|----|
|Sign In Page's UI implementation|[#236](https://github.com/bounswe/bounswe2023group4/pull/236)|
|Integrating Sign in UI with the backend|[#268](https://github.com/bounswe/bounswe2023group4/pull/268)|
|Tests for sign-in page|[#288](https://github.com/bounswe/bounswe2023group4/pull/288)|
|Implemeting the Vote Page UI|[#329](https://github.com/bounswe/bounswe2023group4/pull/329)|
|Writing tests for the poll page |[#470](https://github.com/bounswe/bounswe2023group4/pull/470)|
|Adapting the isOpen Parameter to the voting mechanism |[#470](https://github.com/bounswe/bounswe2023group4/pull/470)|
|Annotation UI |[#572](https://github.com/bounswe/bounswe2023group4/pull/572)|
|Implementation of the following mechanism |[#575](https://github.com/bounswe/bounswe2023group4/pull/575)|
|Implementation of leaderboard back-end endpoints |[#603](https://github.com/bounswe/bounswe2023group4/pull/603)|
|Leaderboard Implementation |[#633](https://github.com/bounswe/bounswe2023group4/pull/633)|
|Fix for the updateBadges function |[#636](https://github.com/bounswe/bounswe2023group4/pull/636)|
|Improved Response and error handling fix for followed and follower endpoints |[#640](https://github.com/bounswe/bounswe2023group4/pull/640)|
#### Unit Tests:
* Sign-in Unit Test:
![image](https://github.com/bounswe/bounswe2023group4/assets/52269552/f3376a2a-3a56-4cf6-9a9a-d068e56fb092)
* Vote Page Unit Test:
 ![image](https://github.com/bounswe/bounswe2023group4/assets/52269552/665dc495-8b15-43e1-bc46-5965811a8ece)


#### Additional Information:
I was planning to write tests for the annotation's UI. Nevertheless, due to the urgency for implementing other features, the task had to be canceled. In addition, I would like to note that Image Annotation will be implemented by the 2nd of January per an agreement with the **PO**.

## Member: Yiğit Şekerci, Subgroup: Android

### Responsibilites
In the management sector, my role was pivotal in overseeing the development of the Android application. I took charge of task distribution and assignment, ensuring a streamlined workflow within our team. As part of the Android subteam, which comprised only two members, we faced a significant workload. One of our critical responsibilities involved making strategic decisions about trade-offs, as it was clear that implementing every aspect of the app within our timeframe was unfeasible. Alongside these managerial duties, I personally handled the implementation of half of the Android app's features.

### Main contributions
Since I was in Android group, I have contributed to code of the Android project only. You can see my most of the contributions from [my issues](https://github.com/bounswe/bounswe2023group4/issues?page=1&q=is%3Aissue+assignee%3AYigitSekerci) and [my PRs](https://github.com/bounswe/bounswe2023group4/pulls?q=is%3Apr+assignee%3AYigitSekerci). Apart from these, I have arranged mobile demo video, executive summary and part of the maintenance section for this report.

#### Code-Related significant issues:
|Task|Issue link|
|---|---|
|Mobile app init|[Issue #169](https://github.com/bounswe/bounswe2023group4/issues/169)|
|Build variant system|[Issue #222](https://github.com/bounswe/bounswe2023group4/issues/222)|
|Network Module|[Issue #223](https://github.com/bounswe/bounswe2023group4/issues/223)|
|Sign up screen|[Issue #260](https://github.com/bounswe/bounswe2023group4/issues/260), [Issue #261](https://github.com/bounswe/bounswe2023group4/issues/261)|
|Sign in screen|[Issue #263](https://github.com/bounswe/bounswe2023group4/issues/263), [Issue #264](https://github.com/bounswe/bounswe2023group4/issues/264)|
|Google sign in|[Issue #265](https://github.com/bounswe/bounswe2023group4/issues/265)|
|Leaderboard screen|[Issue #313](https://github.com/bounswe/bounswe2023group4/issues/313), [Issue #637](https://github.com/bounswe/bounswe2023group4/issues/637)|
|Create poll screen|[Issue #314](https://github.com/bounswe/bounswe2023group4/issues/314), [Issue #361](https://github.com/bounswe/bounswe2023group4/issues/361)|
|Moderation screen|[Issue #418](https://github.com/bounswe/bounswe2023group4/issues/418)|
|Annotations|[Issue #548](https://github.com/bounswe/bounswe2023group4/issues/548)|
|Comments|[Issue #638](https://github.com/bounswe/bounswe2023group4/issues/638)|
|Semantic Search|[Issue #649](https://github.com/bounswe/bounswe2023group4/issues/649)|

#### Management-Related significant issues:
|Task|Issue link|
|---|---|
|Project plan|[Issue #140](https://github.com/bounswe/bounswe2023group4/issues/140)|
|Project plan update|[Issue #216](https://github.com/bounswe/bounswe2023group4/issues/216)|
|Project plan update 2|[Issue #315](https://github.com/bounswe/bounswe2023group4/issues/315)|
|Semantic tagging reqs update|[Issue #173](https://github.com/bounswe/bounswe2023group4/issues/173)|

#### Pull requests:
For the fast development process, I have also included bug fixes in the branches. That's why task name may not summarize what I have done in the PR. For better summary please look to the PR.

|Task|PR link|
|---|---|
|Mobile Project init|[PR #186](https://github.com/bounswe/bounswe2023group4/pull/186)|
|Build variants|[PR #228](https://github.com/bounswe/bounswe2023group4/pull/228)|
|Network module|[PR #229](https://github.com/bounswe/bounswe2023group4/pull/229)|
|Font arrange|[PR #233](https://github.com/bounswe/bounswe2023group4/pull/233)|
|Theme arrange|[PR #235](https://github.com/bounswe/bounswe2023group4/pull/235)|
|Navigation drawer|[PR #244](https://github.com/bounswe/bounswe2023group4/pull/244)|
|Auth|[PR #273](https://github.com/bounswe/bounswe2023group4/pull/273)|
|Auth fixes and improvements|[PR #285](https://github.com/bounswe/bounswe2023group4/pull/285)|
|Add extra tests|[PR #293](https://github.com/bounswe/bounswe2023group4/pull/293)|
|Auth validation + Google sign in|[PR #331](https://github.com/bounswe/bounswe2023group4/pull/331)|
|Leaderboard UI|[PR #340](https://github.com/bounswe/bounswe2023group4/pull/340)|
|Create poll screen|[PR #435](https://github.com/bounswe/bounswe2023group4/pull/435)|
|Bug fixes + Flow improvements|[PR #461](https://github.com/bounswe/bounswe2023group4/pull/461), [PR #467](https://github.com/bounswe/bounswe2023group4/pull/467)|
|Extra tests for create poll screen|[PR #468](https://github.com/bounswe/bounswe2023group4/pull/468)|
|All moderation screens|[PR #621](https://github.com/bounswe/bounswe2023group4/pull/621)|
|Annotation + Poll detail Redesign + Comment + Report + Leaderboard backend integration|[PR #644](https://github.com/bounswe/bounswe2023group4/pull/644)|
|Semantic Search|[PR #648](https://github.com/bounswe/bounswe2023group4/pull/648)|
|Last UI fixes for the final release|[PR #651](https://github.com/bounswe/bounswe2023group4/pull/651)|

#### Tests
We have many tests and it is not possible to show them all. I will only show one test for test class that are long.

* Custom input field tests (Look to the class for all test cases)
![Input field test](https://github.com/bounswe/bounswe2023group4/assets/56599776/f2f1c1c1-3714-4b72-9d75-2b8217cca331)
* Error Dialog tests (Look to the class for all test cases)
![Error dialog test](https://github.com/bounswe/bounswe2023group4/assets/56599776/19a7ef35-dfa1-433d-855c-239086132b9f)
* Nav drawer tests (Look to the class for all test cases)
![Nav drawer test](https://github.com/bounswe/bounswe2023group4/assets/56599776/24b4855b-eea6-4d23-9bfd-7db7cfcf9098)
* Login screen tests (Look to the class for all test cases)
![Login screen test](https://github.com/bounswe/bounswe2023group4/assets/56599776/8604c45f-5ff2-4523-b8c7-11308d4f0268)
* Main screen tests (Look to the class for all test cases)
![Main screen test](https://github.com/bounswe/bounswe2023group4/assets/56599776/8101fde8-089e-46e9-b51e-860444e99bf4)
* Sign up screen tests (Look to the class for all test cases)
![Sign up screen test](https://github.com/bounswe/bounswe2023group4/assets/56599776/e705d5a0-0bf5-4226-9e91-2ad7c063ef8d)

Unit tests:
* Long extension tests
![Long extension test](https://github.com/bounswe/bounswe2023group4/assets/56599776/5e02dd19-ce8c-43b7-be78-6e4fbc5895e2)
* String extension tests
![String extension test](https://github.com/bounswe/bounswe2023group4/assets/56599776/bd373ecb-47b1-4e14-87f6-690463daec5c)
* Create poll viewmodel tests
![Create poll test](https://github.com/bounswe/bounswe2023group4/assets/56599776/9da3f02a-8e74-4698-8a71-ffcb3c7908fe)
* Login screen viewmodel tests
![Login screen test](https://github.com/bounswe/bounswe2023group4/assets/56599776/fa929e2c-3a67-46a6-bcf2-4302119179fc)
* Sign up screen viewmodel tests
![Sign up screen test](https://github.com/bounswe/bounswe2023group4/assets/56599776/7b85cddc-b29c-4b17-904b-66ed803c31db)
* Date transformation tests
![Date transformation test](https://github.com/bounswe/bounswe2023group4/assets/56599776/1be29a15-fbcf-4367-a8a1-2c2ca89c1a7c)

#### Additional Information
Unfortunately, I couldn't cover most of my written code between Milestone 2 and Final Milestone in tests because of time issues. I have focused on delivering features that's why I have skipped some tests and some design patterns to be able to complete the features.

## Member: Enes Furkan Arslan - Group 4 - Frontend
### Responsibilities: 
My main responsibilites are implementing necessary components on frontend and make them functional by linking them with backend. Other than that I am responsible for updating the design of the project as necessarily. I am also responsible for preparing necessary deliverables for milestones and take part in the presentations according to the team's needs. I am also responsible for keeping track of the RAM and make sure it is updated when necessary. Finally I am responsible for taking my part on the management of the project and reviewing the works done by other members of the team. 

### Main contributions: 
I have involved in a lot of processes in this project from management to implementation aspects. Some of my management related contributions are preparing **new RAM and communication plan**, taking part in division of team into subteams, deciding on the technologies to be used on frontend with front team, **updating mock-up designs**, **updating requirements based on feedbacks from PO**, organizing extra meetings for ongoing tasks and keep checking the progress of other tasks and reviewing them. About implementation part I have implemented the **sign up page**, **create poll page**, **moderation-not-moderator page** and **moderation-not-jury page** UIs together with their backend connections to make them functional. I also **tested** and corrected all of these pages' functionalities manually with possible scenarios after implementation. I have also implemented **unit tests** for these pages. Other than these, I also took urgent tasks like bug and error fixing in the project and get them completed. Details are in the next sections. 

### Code-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
|I have researched and studied frontend technologies that we used in the project|[#187](https://github.com/bounswe/bounswe2023group4/issues/187),[#188](https://github.com/bounswe/bounswe2023group4/issues/188),[#189](https://github.com/bounswe/bounswe2023group4/issues/189),[#190](https://github.com/bounswe/bounswe2023group4/issues/190),[#191](https://github.com/bounswe/bounswe2023group4/issues/191),[#192](https://github.com/bounswe/bounswe2023group4/issues/192)|
|I have implemented sign up form, sign up button, sign up with google button and link to home, structured the sign up page as in the mock up design and added sign up photo|[#212](https://github.com/bounswe/bounswe2023group4/issues/212)|
|I have make the integration of sign up page with the backend|[#257](https://github.com/bounswe/bounswe2023group4/issues/257)|
|I have added some features to sign up page like redirecting user to sign in page if sign up is succesfull and informing user in case username already exists.|[#276](https://github.com/bounswe/bounswe2023group4/issues/276)|
|I have implemented necessary tests for sign up page|[#286](https://github.com/bounswe/bounswe2023group4/issues/286)| 
|Implemented create poll page's main UI components according to the mock-up|[#320](https://github.com/bounswe/bounswe2023group4/issues/320)|
|UI/UX of create poll page is improved and page made more user friendly|[#348](https://github.com/bounswe/bounswe2023group4/issues/348)|
|API request for create poll page is implemented in accordance with backend and database|[#349](https://github.com/bounswe/bounswe2023group4/issues/349)|
|Realized an error and fixed it immediately for back and front teams' progress|[#377](https://github.com/bounswe/bounswe2023group4/issues/377)|
|Finalized authentication pages' backend connections|[#401](https://github.com/bounswe/bounswe2023group4/issues/401)|
|Added point indicator component to create poll page|[#404](https://github.com/bounswe/bounswe2023group4/issues/404)|
|Implemented a detailed input validation on create poll page and tested manually|[#406](https://github.com/bounswe/bounswe2023group4/issues/406)| 
|Finalized create poll page's backend connection as changes occurred in swagger documentation|[#407](https://github.com/bounswe/bounswe2023group4/issues/407)|
|Re-implemented a feature of creating poll after realizing an inconsistency between mock up and requirements|[#441](https://github.com/bounswe/bounswe2023group4/issues/441)| 
|Implemented unit tests for create poll page to test its functionality|[#453](https://github.com/bounswe/bounswe2023group4/issues/453)| 
| Implement the UI of moderation-not moderator page from mock up | [#498](https://github.com/bounswe/bounswe2023group4/issues/498) |
| Start implementation of general UI of moderation-not jury from mock up | [#499](https://github.com/bounswe/bounswe2023group4/issues/499) |
| Complete the implementation of moderator not jury UI | [#559](https://github.com/bounswe/bounswe2023group4/issues/559) |
| Implement not jury page backend connection for becoming jury posts | [#562](https://github.com/bounswe/bounswe2023group4/issues/562) |
| Implement moderator page tag selection UI | [#581](https://github.com/bounswe/bounswe2023group4/issues/581) |
| Implement connection of tag selection on moderator-not-jury page | [#582](https://github.com/bounswe/bounswe2023group4/issues/582) |
| Implement connection of backend to show the moderator page to member/moderator | [#583](https://github.com/bounswe/bounswe2023group4/issues/583) |
| Implement the become moderator request | [#595](https://github.com/bounswe/bounswe2023group4/issues/595) |
| Write the unit tests for moderation-not-moderator page | [#584](https://github.com/bounswe/bounswe2023group4/issues/584) |
| Write unit tests for moderation-not-jury page | [#585](https://github.com/bounswe/bounswe2023group4/issues/585)

### Management-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| I took part in division of our team to subteams|[#141](https://github.com/bounswe/bounswe2023group4/issues/141)|
| I took part in the frontend technology selection|[#153](https://github.com/bounswe/bounswe2023group4/issues/153)|
|I have created a responsibility assignment matrix for the team|[#152](https://github.com/bounswe/bounswe2023group4/issues/152), [#172](https://github.com/bounswe/bounswe2023group4/issues/172), [#214](https://github.com/bounswe/bounswe2023group4/issues/214)|
|I have taken part on updating our mock up designs|[#174](https://github.com/bounswe/bounswe2023group4/issues/174),[#201](https://github.com/bounswe/bounswe2023group4/issues/201)|
|I have created the new communication plan of the team|[#299](https://github.com/bounswe/bounswe2023group4/issues/299)| 
| RAM is updated after a team member has leaved|[#350](https://github.com/bounswe/bounswe2023group4/issues/350)|
| Updated the requirements according to feedbacks|[#486](https://github.com/bounswe/bounswe2023group4/issues/486)|
| Overview section added to requirements and glossary updated|[#488](https://github.com/bounswe/bounswe2023group4/issues/488)|
| Prepared progress based on each requirement for milestone 2 report|[#489](https://github.com/bounswe/bounswe2023group4/issues/489)|

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
|I have implemented sign up form, sign up button, sign up with google button and link to home, structured the sign up page as in the mock up design and added sign up photo|[#227](https://github.com/bounswe/bounswe2023group4/pull/227)|
|I have make the integration of sign up page with the backend|[#269](https://github.com/bounswe/bounswe2023group4/pull/269)|
|I have added some features to sign up page like redirecting user to sign in page if sign up is succesfull and informing user in case username already exists.|[#277](https://github.com/bounswe/bounswe2023group4/pull/277)|
|I have implemented necessary tests for sign up page|[#284](https://github.com/bounswe/bounswe2023group4/pull/284)|
|To milestone report 1, I have added communication plan and RAM, list and status of deliverables part, evaluation of deliverables part, milestone review for frontend part, evaluation of tools part for general and frontend. I have also reviewed the other parts.|[#298](https://github.com/bounswe/bounswe2023group4/pull/298)|
|Implemented create poll page's main UI components according to the mock-up|[#332](https://github.com/bounswe/bounswe2023group4/pull/332)|
|UI/UX of create poll page is improved and page made more user friendly, API request for create poll page is implemented in accordance with backend and database|[#374](https://github.com/bounswe/bounswe2023group4/pull/374)|
|Realized an error and fixed it immediately for back and front teams' progress|[#378](https://github.com/bounswe/bounswe2023group4/pull/378)|
|Added point indicator component to create poll page, Implemented a detailed input validation on create poll page and tested manually, Finalized create poll page's backend connection as changes occurred in swagger documentation, Re-implemented a feature of creating poll after realizing an inconsistency between mock up and requirements|[#445](https://github.com/bounswe/bounswe2023group4/pull/445)|
|Finalized authentication pages' backend connections|[#446](https://github.com/bounswe/bounswe2023group4/pull/446)|
|Implemented unit tests for create poll page to test its functionality|[#457](https://github.com/bounswe/bounswe2023group4/pull/457)|
|Added unit test reports for sign-up and create poll pages, Added progress based on requirements, Added self contribution|[#484](https://github.com/bounswe/bounswe2023group4/pull/484)| 
| UI of moderation-not-moderator page is implemented for users that are not currently moderators. Main UI of the moderator-not-jury page is completed with mock data. | [#551](https://github.com/bounswe/bounswe2023group4/pull/551) |
| Backend connection for polls that needs jury intervention is done and tested manually with the updated end point. UI update is also added | [#577](https://github.com/bounswe/bounswe2023group4/pull/577) |
| UI of tag selection in the moderation-not-jury page is implemented with mock data. | [#588](https://github.com/bounswe/bounswe2023group4/pull/588) |
| Backend connections of not moderator and not jury pages | [#599](https://github.com/bounswe/bounswe2023group4/pull/599) |
| Unit tests for moderation-not-moderator page | [#626](https://github.com/bounswe/bounswe2023group4/pull/626) |
| Unit tests for moderation-not-jury page | [#635](https://github.com/bounswe/bounswe2023group4/pull/635) |
| Error fix in sign up and moderation-not-jury pages | [#654](https://github.com/bounswe/bounswe2023group4/pull/654)

### Unit Tests
I have written tests for sign up page, create poll page, moderation-not-moderator page and moderation-not-jury page. They can be found [here](https://github.com/bounswe/bounswe2023group4/tree/main/prediction-polls/frontend/src/Pages) under folders: Auth>Sign Up , Create and Moderation. 

### Additional information:
I have tried to organize team progress by arranging extra meetings for tasks when necessary. I also reminded the deadlines for significant tasks so that team progress did not fail. I took part in the milestone 1 presentation by taking notes for PO feedbacks. I took part in both milestone 2 and final milestone by setting up technical devices accordingly with our scenario and I have managed devices during the presentation as our presenter proceeded with the scenario. I answered to questions about the project coming from PO and audience when necessary. I communicated with the PO and got feedbacks for milestone 1. Then I moderated a meeting to share tasks for milestone 2 report together with addressing feedbacks I got. I always tried to check if any of my teammates needs my help and give them a hand when necessary. 

## Member: Ahmet Emre Şafak Group 4 - Mobile
### Responsibilities: 
My primary responsibility was the development of the mobile application. This role involved handling a wide range of tasks, from implementing features to addressing bugs and enhancing the application's functionality.

### Main Contributions:
My contributions were extensive and varied across the development of the mobile application. Key contributions can be inferred from the issues I worked on, reflecting my involvement in both front-end and back-end aspects of the mobile app.

### Code-related Significant Issues:
| Task Description | Issue Link |
| ---------------- | ---------- |
| Implement Follow-Unfollow Feature for Mobile | [#617](https://github.com/bounswe/bounswe2023group4/issues/617) |
| Add Share Functionality to Mobile App | [#589](https://github.com/bounswe/bounswe2023group4/issues/589) |
| Add Forgot Password feature to auth flow in mobile | [#549](https://github.com/bounswe/bounswe2023group4/issues/549) |
| Implement navigation to other users' profiles | [#514](https://github.com/bounswe/bounswe2023group4/issues/514) |
| Fix profile image related issues in polls | [#513](https://github.com/bounswe/bounswe2023group4/issues/513) |
| Add edit logic to the profile page | [#512](https://github.com/bounswe/bounswe2023group4/issues/512) |
| Implement Poll Detail Screen Backend Requests | [#417](https://github.com/bounswe/bounswe2023group4/issues/417) |
| Implement Profile Screen Backend Requests | [#416](https://github.com/bounswe/bounswe2023group4/issues/416) |
| Implement feed screen backend requests | [#362](https://github.com/bounswe/bounswe2023group4/issues/362) |
| Implement Poll Detail Screen UI | [#312](https://github.com/bounswe/bounswe2023group4/issues/312) |
| Implement profile screen UI | [#311](https://github.com/bounswe/bounswe2023group4/issues/311) |
| Implement feed screen UI | [#266](https://github.com/bounswe/bounswe2023group4/issues/266) |

### Management-related Significant Issues:
This semester, my focus was primarily on the development aspect of the project, and I was not involved in many managerial issues.


### Pull Requests:
| Description | Pull Request |
| ----------- | ------------ |
| Points Improvement | [#647](https://github.com/bounswe/bounswe2023group4/pull/647) |
| Bug Fix for Follow Functionality | [#646](https://github.com/bounswe/bounswe2023group4/pull/646) |
| Bug Fix for Photo Upload Issues | [#634](https://github.com/bounswe/bounswe2023group4/pull/634) |
| Improvement on Follow Functionality | [#632](https://github.com/bounswe/bounswe2023group4/pull/632) |
| Added Feature for Forgot Password in Auth Flow | [#612](https://github.com/bounswe/bounswe2023group4/pull/612) |
| Implemented Share Functionality | [#609](https://github.com/bounswe/bounswe2023group4/pull/609) |
| Edit Profile Functionality for Mobile App | [#578](https://github.com/bounswe/bounswe2023group4/pull/578) |
| Profile Improvements for Other Users | [#536](https://github.com/bounswe/bounswe2023group4/pull/536) |
| Voting Functionality for Polls | [#462](https://github.com/bounswe/bounswe2023group4/pull/462) |
| Finalizing Profile and Feed Screens | [#438](https://github.com/bounswe/bounswe2023group4/pull/438) |
| Profile Screen Implementation | [#373](https://github.com/bounswe/bounswe2023group4/pull/373) |
| Poll Voting Mechanism Implementation | [#339](https://github.com/bounswe/bounswe2023group4/pull/339) |
| Created Poll Vote Composable Element | [#337](https://github.com/bounswe/bounswe2023group4/pull/337) |
| UI Implementation for Feed Screen | [#300](https://github.com/bounswe/bounswe2023group4/pull/300) |
| Navigation Features in Mobile App | [#245](https://github.com/bounswe/bounswe2023group4/pull/245) |
| Updated Gradle Dependencies | [#226](https://github.com/bounswe/bounswe2023group4/pull/226) |
| Initialization of Android Project | [#186](https://github.com/bounswe/bounswe2023group4/pull/186) |

### Unit Tests
I have implemented Unit Tests for the DATA layer I have created.
[Link to tests](https://github.com/bounswe/bounswe2023group4/tree/mobile/development/prediction-polls/android/app/src/test/java/com/bounswe/predictionpolls)


### Additional Information:
Throughout the semester, I engaged in extensive research and learned a great deal about Android development and Jetpack Compose. This experience not only enhanced my technical skills but also contributed significantly to the overall development of the mobile application.


## Member: Selin Işık - Group 4 - Frontend
### Responsibilities: 
My primary responsibilities include developing the user interface and spearheading the implementation of the frontend aspects of our project. I was tasked with organizing and planning the workload for the frontend team, ensuring an efficient division of tasks. Additionally, I conducted code reviews for my team members, offering guidance and support to facilitate successful task completion.

### Main contributions: 
At the semester's start, I focused on updating the mock-ups and selecting the color theme for our application. I also developed a learning path tailored for the frontend team to streamline our development process. Subsequently, I formulated a project plan centered around the chosen technologies and our milestone objectives. My contributions to the web application development were significant, particularly in designing the Poll Card Structure, Feed Page, and Profile Pages. Furthermore, I took the lead in implementing most of the Pop-Up Components in our project.

### Code-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| Implement Semantic Search for Web App| [#597](https://github.com/bounswe/bounswe2023group4/issues/597) |
| General Pop Up Structure in Web App(Comment, Share, Report, Jury Rules, Create Tag Select , Follower, Following )| [#596](https://github.com/bounswe/bounswe2023group4/issues/596), [#564](https://github.com/bounswe/bounswe2023group4/issues/564) |
| Guest User Mechanics | [#566](https://github.com/bounswe/bounswe2023group4/issues/566) |
| Final Moderation Page | [#563](https://github.com/bounswe/bounswe2023group4/issues/563) |
| Project Name and Logo | [#511](https://github.com/bounswe/bounswe2023group4/issues/511) |
| Time Input addition | [#510](https://github.com/bounswe/bounswe2023group4/issues/510) |
| Poll Card UI update and Color Update | [#508](https://github.com/bounswe/bounswe2023group4/issues/508), [#509](https://github.com/bounswe/bounswe2023group4/issues/509) |
| Badge Select | [#505](https://github.com/bounswe/bounswe2023group4/issues/505) |
| Edit Profile Page | [#420](https://github.com/bounswe/bounswe2023group4/issues/420), [#415](https://github.com/bounswe/bounswe2023group4/issues/415), [#364](https://github.com/bounswe/bounswe2023group4/issues/364) |
| Profile Page| [#419](https://github.com/bounswe/bounswe2023group4/issues/419), [#306](https://github.com/bounswe/bounswe2023group4/issues/306) |
| Page Responsiveness(Profile, Feed, Auth Pages) | [#365](https://github.com/bounswe/bounswe2023group4/issues/365),[#307](https://github.com/bounswe/bounswe2023group4/issues/307),[#309](https://github.com/bounswe/bounswe2023group4/issues/309),[#310](https://github.com/bounswe/bounswe2023group4/issues/310) |
| Css Update(Sign-In, Sign-Up) | [#305](https://github.com/bounswe/bounswe2023group4/issues/305) |
| Feed Page UI | [#259](https://github.com/bounswe/bounswe2023group4/issues/259) |
| Sidebar Component | [#258](https://github.com/bounswe/bounswe2023group4/issues/258) |
| Poll Card | [#265](https://github.com/bounswe/bounswe2023group4/issues/265) |
| Sign In Page | [#205](https://github.com/bounswe/bounswe2023group4/issues/205) |
| Create Theme structure in Project | [#203](https://github.com/bounswe/bounswe2023group4/issues/203) |




### Management-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| Milestone2 Customer Feedbacks | [#490](https://github.com/bounswe/bounswe2023group4/issues/490) |
| Frontend Project Plan | [#202](https://github.com/bounswe/bounswe2023group4/issues/202), [#140](https://github.com/bounswe/bounswe2023group4/issues/140) |
| MockUp Updates | [#201](https://github.com/bounswe/bounswe2023group4/issues/201) ,[#174](https://github.com/bounswe/bounswe2023group4/issues/174)|
| Add Annotation Requirements | [#175](https://github.com/bounswe/bounswe2023group4/issues/175), [#165](https://github.com/bounswe/bounswe2023group4/issues/165) |

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
| Follower and Following Pop-Up and User Follow and Unfollow features |  [#650](https://github.com/bounswe/bounswe2023group4/pull/650) |
| Comment and Report Backend Integration | [#643](https://github.com/bounswe/bounswe2023group4/pull/643) |
| Moderation final page UI, Backend Integration and Jury Rules Pop Up | [#629](https://github.com/bounswe/bounswe2023group4/pull/629) |
| Poll Tag PopUp and Backend Integration | [#628](https://github.com/bounswe/bounswe2023group4/pull/628) |
| Guest User Mechanics Implementation | [#587](https://github.com/bounswe/bounswe2023group4/pull/587) |
| Pop Up UI and Modal Context Structure | [#586](https://github.com/bounswe/bounswe2023group4/pull/586) |
| Added time input box next to the date inputs | [#561](https://github.com/bounswe/bounswe2023group4/pull/561) |
| Badge Select Backend Integration and isHidden backend integration | [#560](https://github.com/bounswe/bounswe2023group4/pull/560) |
| Color Update and Poll UI updates | [#558](https://github.com/bounswe/bounswe2023group4/pull/558) |
| Edit Profile Bugfix | [#533](https://github.com/bounswe/bounswe2023group4/pull/533) | 
| Profile and Edit Profile Page backend integration, Profile and Edit profile page tests and some bugfix | [#476](https://github.com/bounswe/bounswe2023group4/pull/476) | 
| Edit Profile Page UI | [#398](https://github.com/bounswe/bounswe2023group4/pull/398) | 
| Auth and Feed page Mobile View | [#369](https://github.com/bounswe/bounswe2023group4/pull/369) | 
| Profile Component and Profile page routing structure| [#368](https://github.com/bounswe/bounswe2023group4/pull/368) | 
| Logout Functionality and button | [#287](https://github.com/bounswe/bounswe2023group4/pull/287) | 
| Feed Page and Poll Component Tests| [#283](https://github.com/bounswe/bounswe2023group4/pull/283) | 
| Feed Page UI and Point Button Component| [#280](https://github.com/bounswe/bounswe2023group4/pull/280) | 
| Poll Card, Poll Tag and Poll Option Components | [#279](https://github.com/bounswe/bounswe2023group4/pull/279) | 
| Sidebar Component | [#274](https://github.com/bounswe/bounswe2023group4/pull/274) | 
| Sign In Page UI update | [#242](https://github.com/bounswe/bounswe2023group4/pull/242) | 
| Added Colors and Theme Context | [#238](https://github.com/bounswe/bounswe2023group4/pull/238) | 


### Unit Tests
I have written tests for sign in page, profile page and edit profile page, Poll Card Component, Sidebar Component, Poll Option Component and Poll Tag component. They can be found [here](https://github.com/bounswe/bounswe2023group4/tree/main/prediction-polls/frontend/src/Pages) under folders: Auth>Sign In , Profile and Edit Profile and [here](https://github.com/bounswe/bounswe2023group4/tree/main/prediction-polls/frontend/src/Components)  under folders:  Poll Card, Sidebar, PollOption, PollTag. 

#### Additional Information
Unfortunately in the last milestone, I have focused on covering as many requirements as possible as you can see in my PR history, that's why I have skipped some tests and some design patterns to be able to complete the features. 

## Member: Şefik Palazoğlu
### Responsibilities: 
Setting up backend logic and database logic. Ensuring frontend structures are stored properly at the backend and are reachable. Setting up backend system logic. Ensuring endpoints are working correctly. Implementing polls endpoints. Implementing internal poll subject tagging.

### Main contributions: 
I have created a mySql database to store users and connected this database to our node.js application. When we started implementing JWT tokens I took part in how to store these tokens in the backend. I took part in storing username/email and password tuples and oversee the hashing protocol of passwords. I prepared and uploaded weekly reports.
* In management aspect:
  -  I have checked the compatibility of work between front teams and backend team regularly.
* In project aspect:
  -  I have tried to point out work we needed to do for requirements.
* In code aspect:
  -  I have implemented all poll endpoints
  -  I have adapted polls endpoints to new error response format. 
  -  I have implemented general point system in polls with Batuhan.
  -  I have implemented get polls, get polls with id, post polls, and poll close endpoints.
  -  I have implemented automatic poll tag generation.
  -  I have written unit tests for poll endpoints.

### Code-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| I revised and updated profile and search sequence diagrams | [#143](https://github.com/bounswe/bounswe2023group4/issues/143), [#145](https://github.com/bounswe/bounswe2023group4/issues/145),[#161](https://github.com/bounswe/bounswe2023group4/issues/161)| 
| I have written unit tests for sign up, log in, logout, access token request endpoints|[#210](https://github.com/bounswe/bounswe2023group4/issues/210)|
| I initialized project’s database | [#162](https://github.com/bounswe/bounswe2023group4/issues/162), [#163](https://github.com/bounswe/bounswe2023group4/issues/163) |
| Learned unit testing in node.js and implement a small test | [#206](https://github.com/bounswe/bounswe2023group4/issues/206) |
| Studied Google authentication and prepare environment| [#208](https://github.com/bounswe/bounswe2023group4/issues/208), [#248](https://github.com/bounswe/bounswe2023group4/issues/248) |
| I have helped database deployment and configuration |[#209](https://github.com/bounswe/bounswe2023group4/issues/209), [#250](https://github.com/bounswe/bounswe2023group4/issues/250)|
| Uploaded and written weekly reports |[#249](https://github.com/bounswe/bounswe2023group4/issues/249), [#160](https://github.com/bounswe/bounswe2023group4/issues/160)|
| I helped coordination of work between backend and frontend teams’ work | [#257](https://github.com/bounswe/bounswe2023group4/issues/257)
|Username Attached to poll| [#463](https://github.com/bounswe/bounswe2023group4/issues/463)| Resolver |
|Manual Poll Closing issue For Discrete Polls| [#456](https://github.com/bounswe/bounswe2023group4/issues/456)| Resolver |
|Reject Votes null value| [#450](https://github.com/bounswe/bounswe2023group4/issues/450)| Resolver |
|Authentication Requirement at Poll GET endpoint| [#447](https://github.com/bounswe/bounswe2023group4/issues/447)| Resolver |
|Improving the JSON response of the /polls/{pollId} endpoint| [#428](https://github.com/bounswe/bounswe2023group4/issues/428)| Resolver |
|Point System| [#405](https://github.com/bounswe/bounswe2023group4/issues/405)| Resolver |
|Poll GET Poll Creator Name| [#403](https://github.com/bounswe/bounswe2023group4/issues/403)| Resolver |
|Poll GET return format| [#402](https://github.com/bounswe/bounswe2023group4/issues/402)| Resolver |
|Poll Voting| [#400](https://github.com/bounswe/bounswe2023group4/issues/400)| Resolver |
|Unit Tests for Poll Endpoints| [#344](https://github.com/bounswe/bounswe2023group4/issues/344)| Resolver |
|Poll Response Restructuring| [#343](https://github.com/bounswe/bounswe2023group4/issues/343)| Resolver |

### Management-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| I created my introduction page | [#146](https://github.com/bounswe/bounswe2023group4/issues/146) |
| I helped deciding subteam division |[#141](https://github.com/bounswe/bounswe2023group4/issues/141)|
| I helped update the diagrams|[#143](https://github.com/bounswe/bounswe2023group4/issues/143)|
| I got familiar with project resources as I was a new member | [#148](https://github.com/bounswe/bounswe2023group4/issues/148)
| I took part in the backend tech selection|[#154](https://github.com/bounswe/bounswe2023group4/issues/154)|

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
| I prepared database for authentication | [#239](https://github.com/bounswe/bounswe2023group4/pull/239) |
| I helped create initial testing environment | [#225](https://github.com/bounswe/bounswe2023group4/pull/225) |
| I uploaded sequence diagrams | [#195](https://github.com/bounswe/bounswe2023group4/pull/195) |
| Add Automatic Tag Functionality | [PR#475](https://github.com/bounswe/bounswe2023group4/pull/475) |
|Implement poll service unit tests| [PR#469](https://github.com/bounswe/bounswe2023group4/pull/469) |
| Implement /polls/close endpoint | [PR#459](https://github.com/bounswe/bounswe2023group4/pull/459) |
| Fix Username Email bug | [PR#465](https://github.com/bounswe/bounswe2023group4/pull/465) |
| Remove Auth Requirement from /polls/{pollId} GET | [PR#448](https://github.com/bounswe/bounswe2023group4/pull/448) |
| Create Poll Endpoint Corrections | [PR#444](https://github.com/bounswe/bounswe2023group4/pull/444) |
| Making Poll Functions async | [PR#442](https://github.com/bounswe/bounswe2023group4/pull/442) |
| Backend/feature/poll vote date | [PR#440](https://github.com/bounswe/bounswe2023group4/pull/440) |
| Adding creator name to poll objects | [PR#426](https://github.com/bounswe/bounswe2023group4/pull/426) |
| /polls/{pollId} GET return object improvement | [PR#429](https://github.com/bounswe/bounswe2023group4/pull/429) |

### Additional information:
I have communicated actively with my team on our discord channel. Unfortunately, I was ill in the 5th week so I have low contributions at that time.

