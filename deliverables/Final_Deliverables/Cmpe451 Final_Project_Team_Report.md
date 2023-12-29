# Cmpe451 Final Project Team Report
#### Prepared by:
**Video:** Link to video demo

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
| [API Endpoints](#API) | Completed |
| [User Interface / User Experience](#User-Interface--User-Experience) | Completed |
| [Annotations](#Annotations) | Completed |
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

#### Requirements Coverage
| ID | Name        | Status           | Notes  |
| --- | ------------- |:-------------:| -----:|
| RID      | Specification | Status | Optional notes |
| ...     | ...      |   ... | ... |

(Status: One of: Not done , Completed , % completed )

# API
* Link to the application API with three example calls related to the core functionality
of your application.

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

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/865e8426-22f3-4056-8a3e-f8cf4311df43" width="50%" />

**Source Code:** [Annotations Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/common/annotation/AnnotatableText.kt)

---

**Feature: Annotate**

<img src="https://github.com/bounswe/bounswe2023group4/assets/59789023/f261508c-84ea-47e6-9fb6-847033245c83" width="50%" />

**Source Code:** [Annotate Source Code](https://github.com/bounswe/bounswe2023group4/blob/mobile/development/prediction-polls/android/app/src/main/java/com/bounswe/predictionpolls/ui/common/annotation/AnnotatableText.kt)

---




  * feature:
    * Web
    * Mobile
  * …

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


## Software

# Individual Reports
## Member: Ali Nasra
### Responsibilities: 
Throughout the project, my responsibilities encompassed multiple facets of the projects. Managerially, I was responsible for tracking the group's plan and confirming compliance with it. Technically, I served as a member of the support subteam which allowed me to contribute to both the backend and frontend subteams.
### Main contributions:
Over the last 4 months, I have revised both the design requirements and the UML diagrams, compiled each subteam's plan, and amalgamated them into a single general plan In addition, I partook in the preparation of each milestone report. For instance, in this report, I was responsible for shooting the demo video and writing the scenario. My contributions to the code base vacillate between my front-end and back-end duties. As an associate of the frontend subteam, I was responsible for implementing multiple pages such as the **sign-in** page, the **vote** page, and the **leaderboard** page with their concomitant backend integration. In addition, I was responsible for implementing the annotations' UI and integrating it with the Annotation server in a **W3C-compliant** manner. As an associate of the backend subteam, I was responsible for implementing the member follow/unfollow mechanisms. In addition, I implemented the leaderboard back-end endpoints. Finally, I implemented the functionality that helps update the badges of each user given their up-to-date standing in each topic.
### Overall description:
#### Code-related significant issues:
|Task|Issue|
|---|----|
|Sign-in page UI Implementation|[#205](https://github.com/bounswe/bounswe2023group4/issues/205)|
|Sign-in page Backend Integration|[#257](https://github.com/bounswe/bounswe2023group4/issues/257)|
|The Implementation of the Voting Page UI|[#304](https://github.com/bounswe/bounswe2023group4/issues/304)|
|Integrating the Vote Page UI with the back-end server|[#347](https://github.com/bounswe/bounswe2023group4/issues/347)|
|Writing Tests for the Voting Page |[#458](https://github.com/bounswe/bounswe2023group4/issues/458)|
|Annotation: UI Research and implementation |[#493](https://github.com/bounswe/bounswe2023group4/issues/493)|
|Connecting the backend-server to the annotation UI |[#532](https://github.com/bounswe/bounswe2023group4/issues/532)|
|Implementing the "follow User" functionality in the Backend |[#541](https://github.com/bounswe/bounswe2023group4/issues/541)|
|Implementing the Point system in the backend|[#590](https://github.com/bounswe/bounswe2023group4/issues/590)|
|Leaderboard : UI Interface & Backend connection|[#630](https://github.com/bounswe/bounswe2023group4/issues/630)|
#### Management-related significant issues:
|Task|Issue|
|---|----|
|Revising and updating the Poll System Sequence Diagrams|[#147](https://github.com/bounswe/bounswe2023group4/issues/147)|
|Merging all subteams' plans|[#324](https://github.com/bounswe/bounswe2023group4/issues/324)|
|Preparing the General Test Plan|[#485](https://github.com/bounswe/bounswe2023group4/issues/485)|
#### Pull requests:
|Task|PR|
|---|----|
|Sign In Page's UI implementation|[#236](https://github.com/bounswe/bounswe2023group4/pull/236)|
|Integrating Sign in UI with the backend|[#268](https://github.com/bounswe/bounswe2023group4/pull/268)|
|Tests for sign-in page|[#288](https://github.com/bounswe/bounswe2023group4/pull/288)|
|Implemeting the Vote Page UI|[#329](https://github.com/bounswe/bounswe2023group4/pull/329)|
|Writing tests for the poll page |[#470](https://github.com/bounswe/bounswe2023group4/pull/470)|
|Annotation UI |[#572](https://github.com/bounswe/bounswe2023group4/pull/572)|
|Implementation of the following mechanism |[#575](https://github.com/bounswe/bounswe2023group4/pull/575)|
|Implementation of leaderboard back-end endpoints |[#603](https://github.com/bounswe/bounswe2023group4/pull/603)|
|Leaderboard Implementation |[#633](https://github.com/bounswe/bounswe2023group4/pull/633)|
#### Unit Tests:
* Sign-in Unit Test:
![image](https://github.com/bounswe/bounswe2023group4/assets/52269552/f3376a2a-3a56-4cf6-9a9a-d068e56fb092)
* Vote Page Unit Test:
 ![image](https://github.com/bounswe/bounswe2023group4/assets/52269552/665dc495-8b15-43e1-bc46-5965811a8ece)


#### Additional Information:
I was planning to write tests for the annotation's UI. Nevertheless, due to the urgency for implementing other features, the task had to be canceled. In addition, I would like to note that Image Annotation will be implemented by the 2nd of January per an agreement with the **PO**.
