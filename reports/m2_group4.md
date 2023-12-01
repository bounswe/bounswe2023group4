# Project Status

# Customer Feedbacks and Reflections

# Changes Since Milestone 1 and Future Plans

### Overview

We mostly focused on polls and profiles since milestone 1. Poll view, poll creation were implemented for different types of polls. Also profile view, profile updation were implemented. Some poll and profile features were added like poll tags an profile badges. We also covered some of the errors that were made in milestone 1. Thanks to these changes our application has the main functionality that our application is supposed to have. The user can customize their profile and vote and create polls according to their preferences.


For our future plans, we will improve poll UI as the data displayed by it is not obvious from the user perspective. New poll UI will make the application easier to use and more fun to explore. We want to implement poll closing for all poll types. This will complete the poll life cycle. We also want to implement moderator system since we want moderators to prevent invalid and inappropriate polls. We will also add annotations for polls which will make the polls more interactable. We also plan to add topic points and we will implement leaderboard which will compare the topic points of users and reward them with badges according to their placement in the leaderboard. This way we will have a reward system for the users that have predicted in our polls.

Below we have included our detailed additions to the project by subteams.

### Frontend Changelog
- Vote Poll Page added
- Create Poll Page added
- Authentication Page Validation
- Leaderboard Page
- Point Backend Integration added
- Profile Page added
- Edit Profile Page added
- Feed Page added
- Search Bar UI added
- Google Sign in added.
- Responsiveness to Poll pages
- Responsiveness to Authentication pages
#### Flaws
- Moderation Page UI is not implemented

### Backend Changelog
- We have finalized google auth 
- Implemented creating, seeing and voting discrete and continuous polls endpoints.
- Image upload and view
- Mock badges
- Point system and poll closing is implemented
- Profile maintenance, viewing and update of profiles
- Poll closing and point
- Improved error management
- Email verification
- Auth validation
- Automatic Poll tagging
- Poll service tests
- Profile service tests
- Authorization service tests
#### Flaws
- More exhaustive tests can be written

### Mobile Changelog
- Profile page
- Feed page
- Create poll page
- Leaderboard ui with mock data
- Auth page validation
- Google sign in
- Removed mock data
- Bug fixes (auth middleware fix, some crashes)
- App bar
- Drawer integration
- DateTime (ISO8601) format support
#### Flaws:
- Poll UI should be improved
- Poll buttons' actions should be implemented.
- Profile page is not completed we don't support some features like edit profile or badges.
- Leaderboard ui will be improved when we connect it to the backend.
- Drawer and main app looks differrent we may adjust their colors.
- Test coverage should be increased.

# List and Status of Deliverables

# Progress According to Requirements

### Functional Requirements 

- 1.1 User Requirements 
- 1.1.1 Guests 

- 1.1.1.1: In progress 
- 1.1.1.2: Completed 
- 1.1.1.3: Completed 
- 1.1.1.4: In progress 
- 1.1.1.5: Not Started 
- 1.1.1.6: Completed 
- 1.1.1.7: In Progress 

- 1.1.2 Authentication

- 1.1.2.1 Sign up

- 1.1.2.1.1: Completed
- 1.1.2.1.2: Completed
- 1.1.2.1.3: In Progress
- 1.1.2.1.4: In Progress
- 1.1.2.1.5: In Progress

- 1.1.2.2 Sign in

- 1.1.2.2.1: Completed
- 1.1.2.2.2: In Progress

- 1.1.3 Profile

- 1.1.3.1: In Progress
- 1.1.3.2: Completed
- 1.1.3.2.1: In Progress
- 1.1.3.2.2: Not Started

- 1.1.4 Members

- 1.1.4.1: Not started
- 1.1.4.2: Not Started
- 1.1.4.3: Not Started
- 1.1.4.4: Not Started
- 1.1.4.5: Not Started
- 1.1.4.6: Not Started
- 1.1.4.7: In Progress
- 1.1.4.7.1: Not Started
- 1.1.4.7.2: Not Started
- 1.1.4.7.3: Completed
- 1.1.4.7.3.1: Completed
- 1.1.4.7.3.2: Completed
- 1.1.4.7.3.3: Completed
- 1.1.4.8: Not Started
- 1.1.4.9: Not Started
- 1.1.4.10: Not Started
- 1.1.4.11: Not Started
- 1.1.4.12: Not Started

- 1.1.5 Polls

- 1.1.5.1 Poll Opening

- 1.1.5.1.1: Completed
- 1.1.5.1.2: Completed
- 1.1.5.1.3: Not Started
- 1.1.5.1.4: Completed
- 1.1.5.1.5: Completed
- 1.1.5.1.6: Not Started
- 1.1.5.1.7: Completed
- 1.1.5.1.8: Completed
- 1.1.5.1.9: Completed
- 1.1.5.1.10: Completed

- 1.1.5.2 Poll Voting

- 1.1.5.2.1: Completed
- 1.1.5.2.2: In Progress
- 1.1.5.2.3: Not Started

- 1.1.5.3 Poll Closing

- 1.1.5.3.1: Not Started
- 1.1.5.3.2: Not Started

- 1.1.5.4 Annotation

- 1.1.5.4.1: Not Started

- 1.1.6 Moderator

- 1.1.6.1: Not Started
- 1.1.6.2: Not Started
- 1.1.6.3: Not Started
- 1.1.6.3.1: Not Started
- 1.1.6.3.1.1: Not Started
- 1.1.6.3.1.2: Not Started
- 1.1.6.3.1.3: Not Started
- 1.1.6.3.2: Not Started
- 1.1.6.3.2.1: Not Started
- 1.1.6.4: Not Started

- 1.1.7 Point System

- 1.1.7.1 Domain Specific Point

- 1.1.7.1.1: Not Started
- 1.1.7.1.2: Not Started
- 1.1.7.1.3: Not Started

- 1.1.7.2 General Point

- 1.1.7.2.1: Not Started
- 1.1.7.2.2: Not Started
- 1.1.7.2.3: Not Started
- 1.1.7.2.4: Not Started
- 1.1.7.2.5: Not Started
- 1.1.7.2.6: Not Started

- 1.1.7.3 Leaderboard

- 1.1.7.3.1: Not started 
- 1.1.7.3.2: Not Started

- 1.1.8 Notifications

- 1.1.8.1: Not Started
- 1.1.8.2: Not Started

### 1.2 System Requirements

- 1.2.1 Polls

- 1.2.1.1 Poll Opening

- 1.2.1.1.1: Completed

- 1.2.1.2 Poll Continuity

- 1.2.1.2: Not Started

- 1.2.1.3 Poll Vote Change

- 1.2.1.3.1: Not Started
- 1.2.1.3.2: Not Started

- 1.2.1.4 Poll Closing

- 1.2.1.4.1: Not Started

- 1.2.2 Grading

- 1.2.2.1: Not Started 
- 1.2.2.2: Not Started 
- 1.2.2.3: Not Started 
- 1.2.2.4: Not Started 
- 1.2.2.5: Not Started 
- 1.2.2.6: Not Started 
- 1.2.2.7: Not Started 
- 1.2.2.8: Not Started 
- 1.2.2.9: Not Started 
- 1.2.2.10: Not Started 
- 1.2.2.11: Not Started 
- 1.2.2.12: Not Started 
- 1.2.2.13: Not Started 
- 1.2.2.14: Not Started 

- 1.2.3 Jury

- 1.2.3.1: Not Started
- 1.2.3.2: Not Started
- 1.2.3.3: Not Started
- 1.2.3.4: Not Started
- 1.2.3.5: Not Started
- 1.2.3.6: Not Started
- 1.2.3.7: Not Started
- 1.2.3.8: Not Started
- 1.2.3.9: Not Started
- 1.2.3.10: Not Started
- 1.2.3.11: Not Started
- 1.2.3.12: Not Started
- 1.2.3.13: Not Started

### Non-Functional Requirements

- 2.1 Portability and Compatibility Requirements

- 2.1.1: In Progress
- 2.1.2: In Progress

- 2.2 Performance and Scalability Requirements

- 2.2.1 Web Application Performance

- 2.2.1.1: In Progress
- 2.2.1.2: In Progress
- 2.2.1.3: In Progress

- 2.2.2 Mobile Application Performance

- 2.2.2.1: In Progress
- 2.2.2.2: In Progress
- 2.2.2.3: In Progress

- 2.2.3 Scalability

- 2.2.3.1: Not Started

- 2.2.4 Data Transfer

- 2.2.4.1: Not Started

- 2.4 Security Requirements
- 2.4.1: Not Started
- 2.4.2: Completed
- 2.4.3: Not Started
- 2.4.4: In Progress


# API documentation

## API documentation link
http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/api-docs
[Uploading Swagger UI.html…]()

## API link
http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/

### Note
API descriptions and examples are already included in documentation link above.

## API Descriptions

### Authorization
#### GET /auth/
Currently this endpoint is for testing token authentication.
#### POST /auth/login
This endpoint is used for user log in. 
#### POST /auth/access-token
This endpoint is for access token refreshments.
#### POST /auth/logout
This endpoint disables refresh token of a user.
#### POST /auth/signup
This endpoint creates a user if provided with the correct format of regitration data
#### POST /auth/google
This endpoint lets user to log in via google. User has to choose a google authentication data format and send data accordingly.

### Polls
#### GET /polls

#### GET /polls/{pollId}

#### POST /polls/discrete

#### POST /polls/continuous

#### POST /polls/discrete/{pollId}/vote

#### POST /polls/continuous/{pollId}/vote

#### POST /polls/close/{pollId}

### Profiles
#### GET /profiles
This endpoint is used for profile data retrieval. This endpoint waits for one of userId,username,email to be able tell which user's profile to fetch. 
#### PATCH /profiles
This endpoint is used for profile update. It takes new profile data as body. 
#### GET /profiles/myProfile
This endpoint is used for retrieveing own profile. It requires access token. The profile of the the user which is given in access token is returned.
#### GET /profiles/{profileId}
This endpoint is used for profile data retrieval. This endpoint waits for profileId. 
#### POST /profiles/profilePhoto
This endpoint is for profile photo upload. The given image file should be in binary format. 

# Unit test reports

## Frontend

### Create Component Unit Test Report

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

### SignUp Component Unit Test Report

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


## Backend
### Authentication unit tests
Authentication endpoints are tested with mock data. Since the logic is in AuthenticationService class the tests are written for it. Every endpoint is tested for success and failure cases.
### Poll unit tests
### Profile unit tests
Profile endpoints are tested with mock data. Since the logic is in ProfileService class the tests are written for it. Every endpoint is tested for success and failure cases.
## Mobile

# General Test Plan

# Status of Annotation Features

# Plans For Annotation

# Individual Contributions
## Member: Emre Batuhan Göç
### Responsibilities: 
Managing backend issue distribution. Setting up backend endpoints and their logic. Ensuring frontend can reach backend.Preparing swagger documentation for backend.
### Main Contributions:
* In management aspect:
  -  I have checked the backend team progress regularly.
* In project aspect:
  -  I have presented the application in the customer milestone presentation.
  -  I have discussed the backend's lacking parts with the frontend and mobile and kept it up to date.
* In code aspect:
  -  I have implemented two different google authentication methods for frontend and mobile.
  -  I have adapted authetication and profile classes to new error response format. 
  -  I have implemented general point system in polls with Şefik.
  -  I have implemented get profile, update profile, get my profile, get profile with profile id endpoints.
  -  I have implemented automatic profile generation on sign up.
  -  I have implemented mock badges for profiles.
  -  I have implemented image storage and usage by setting up S3 connection from backend and handling incoming image files in backend. I have also helped frontend to implement  input file retrieval.
  -  I have written unit tests for profile endpoints.
  -  I have updated the unit tests for authentication endpoints.

### Code-related significant issues:
|Task|Relevant significant issues| My duty |
| --- | --- | --- |
|Implement Google code sign in method for frontend| [#321](https://github.com/bounswe/bounswe2023group4/issues/321)| Resolver |
|Implement Google Id sign in method for mobile| [#322](https://github.com/bounswe/bounswe2023group4/issues/322)| Resolver |
|Implement Profile Endpoints| [#351](https://github.com/bounswe/bounswe2023group4/issues/351),[#352](https://github.com/bounswe/bounswe2023group4/issues/352)| Resolver |
|Point System| [#405](https://github.com/bounswe/bounswe2023group4/issues/405)| Resolver |
|Implement get my profile endpoint| [#410](https://github.com/bounswe/bounswe2023group4/issues/410)| Resolver |
|Generate profile automatically on sign up| [#411](https://github.com/bounswe/bounswe2023group4/issues/411)| Resolver |
|Profile classses new error response format| [#353](https://github.com/bounswe/bounswe2023group4/issues/353)| Resolver |
|Authentication classes new error response format| [#413](https://github.com/bounswe/bounswe2023group4/issues/413)| Resolver |
|Image storage and usage backend implementation| [#415](https://github.com/bounswe/bounswe2023group4/issues/415)| Resolver |
|Create Mock Badges| [#412](https://github.com/bounswe/bounswe2023group4/issues/412)| Resolver |
|Profile swagger and unit tests| [#414](https://github.com/bounswe/bounswe2023group4/issues/414),[#355](https://github.com/bounswe/bounswe2023group4/issues/355),[#354](https://github.com/bounswe/bounswe2023group4/issues/354)| Resolver |

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
| Implement Google code sign in method for frontend | [PR#275](https://github.com/bounswe/bounswe2023group4/pull/275) |
|Implement Google Id sign in method for mobile| [PR#328](https://github.com/bounswe/bounswe2023group4/pull/328) |
| Implement Profile Endpoints | [PR#382](https://github.com/bounswe/bounswe2023group4/pull/382) |
| Point System | [PR#439](https://github.com/bounswe/bounswe2023group4/pull/439) |
| Implement get my profile endpoint | [PR#433](https://github.com/bounswe/bounswe2023group4/pull/433) |
| Generate profile automatically on sign up | [PR#432](https://github.com/bounswe/bounswe2023group4/pull/432) |
| Profile classses new error response format | [PR#387](https://github.com/bounswe/bounswe2023group4/pull/387) |
| Authentication classes new error response format | [PR#430](https://github.com/bounswe/bounswe2023group4/pull/430) |
| Image storage and usage backend implementation | [PR#437](https://github.com/bounswe/bounswe2023group4/pull/437) |
| Create Mock Badges | [PR#434](https://github.com/bounswe/bounswe2023group4/pull/434) |
| Profile swagger and unit tests | [PR#477](https://github.com/bounswe/bounswe2023group4/pull/477) |
| Authentication unit tests update | [PR#479](https://github.com/bounswe/bounswe2023group4/pull/479) |

##  Member: Ali Nasra
### Responsibilities:
I was mainly tasked with developing the Poll Vote Page with all of its functionalities. Additionally, I was responsible for bookkeeping the team's plans.
### Main contributions:
I was responsible for updating the UI of the Poll Vote's page and other relevant components such as the poll card and integrating the Backend functionalities. Additionally, I was responsible for reviewing the front-end team's pull requests. Managerially, I was tasked with compiling each subteam's separate plan and combining them into a single, grand plan. I was expected to update the plan as per the requests of the team members.
### Code-related significant issues:

| Task  | Relevant Issue |  Duty |
| ------------- | ------------- | ------------- |
| The implementation of the voting page UI | [#304](https://github.com/bounswe/bounswe2023group4/issues/304) | Resolver |
| Integrating the Vote Page UI with the back-end server  | [#347](https://github.com/bounswe/bounswe2023group4/issues/347)  | Resolver |
| Improving the JSON response of the /polls/{pollId} endpoint  | [#428](https://github.com/bounswe/bounswe2023group4/issues/428)  | Resolver |
| Solving the Frontend choice padding problem  | [#452](https://github.com/bounswe/bounswe2023group4/issues/452)  | Resolver |
| Solving Unspecified closingDate Poll Render Problem  | [#454](https://github.com/bounswe/bounswe2023group4/issues/454)  | Resolver |
| Adapting the isOpen Parameter to the voting mechanism  | [#473](https://github.com/bounswe/bounswe2023group4/issues/473)  | Resolver |
| Writing Tests for the Voting page  | [#458](https://github.com/bounswe/bounswe2023group4/issues/458)  | Resolver |


### Management-related significant issues:

| Task  | Relevant Issue | Duty |
| ------------- | ------------- | ------------- |
| Merging all subteams' plans |  [#324](https://github.com/bounswe/bounswe2023group4/issues/324)   | Resolver |
| Updating Mobile Project Plan |  [#315](https://github.com/bounswe/bounswe2023group4/issues/315)   | Resolver |
| Writing the Test Plan for the 8th week report |  [#424](https://github.com/bounswe/bounswe2023group4/issues/424)   | Resolver |
| Preparing the General Test Plan |  [#485](https://github.com/bounswe/bounswe2023group4/issues/485)   | Resolver |
| Adding a feedback section to the requirement's wiki page |  [#488](https://github.com/bounswe/bounswe2023group4/issues/488)   | Reviewer |
| Reporting the team's progress in terms of requirements |  [#489](https://github.com/bounswe/bounswe2023group4/issues/489)   | Reviewer |

### Pull requests: 

| Task   | Relevant Pull Request | Taken Action(s) |
| ------------- | ------------- | ------------- |
| Creating Vote Page UI  | [#329](https://github.com/bounswe/bounswe2023group4/pull/329) | Creator  |
| Migrating CSS Files  | [#330](https://github.com/bounswe/bounswe2023group4/pull/339) | Creator  |
| Creating Poll Page UI  | [#332](https://github.com/bounswe/bounswe2023group4/pull/332) | Reviewer & Merger  |
| Styling of create poll page plus API Requests added | [#374](https://github.com/bounswe/bounswe2023group4/pull/374) | Reviewer & Merger |
| Adding creator name to poll objects | [#426](https://github.com/bounswe/bounswe2023group4/pull/426) | Reviewer & Merger  |
| /polls/{pollId} GET return object improvement | [#429](https://github.com/bounswe/bounswe2023group4/pull/429)| Reviewer & Merger |
| Test plan | [#443](https://github.com/bounswe/bounswe2023group4/pull/443) |Creator & Merger|
| Backend Integration to the Voting Page | [#449](https://github.com/bounswe/bounswe2023group4/pull/449) | Creator & Merger |
| Adding UI responses and improving visibility | [#455](https://github.com/bounswe/bounswe2023group4/pull/455) | Creator & Merger |
| Writing tests for the Create Poll Page | [#457](https://github.com/bounswe/bounswe2023group4/pull/457) | Reviewer & Merger |
| Writing tests for the poll page | [#470](https://github.com/bounswe/bounswe2023group4/pull/470) | Creator & Merger |
| Implementing Poll Feed Page's Backend Connection | [#472](https://github.com/bounswe/bounswe2023group4/pull/472) | Reviewer & Merger |
| Handling the voting of closed polls | [#474](https://github.com/bounswe/bounswe2023group4/pull/474) | Creator & Merger |
| Profile Page implementation | [#476](https://github.com/bounswe/bounswe2023group4/pull/476) | Reviewer & Merger |
| Merging the Frontend Development Branch to the main branch | [#481](https://github.com/bounswe/bounswe2023group4/pull/481) | Reviewer & Merger |

## Member: Ahmet Emre Şafak
### Responsibilities: 
Creating and managing the mobile application's user interface and backend connections.

### Main Contributions:
* **In management aspect:**
  - Regularly monitored and ensured the progress and integration of mobile features.
* **In project aspect:**
  - Actively engaged in discussions to align the mobile application with overall project requirements and user needs.
  - Collaborated closely with the backend team to ensure seamless integration.
* **In code aspect:**
  - Implemented the Profile Screen UI, providing a user-friendly interface for profile management.
  - Developed the Poll Detail Screen UI, enabling users to view and interact with poll details effectively.
  - Integrated feed screen with backend requests, ensuring dynamic content delivery and interaction.
  - Implemented backend requests for the Profile Screen, facilitating user data management and updates.
  - Developed backend requests for the Poll Detail Screen, allowing for real-time poll interactions and data retrieval.
  - Created the initial feed screen UI, setting the foundation for content display and user interaction.

### Code-related significant issues:
| Task | Relevant significant issues | My duty |
| --- | --- | --- |
| Implement profile screen UI | [#311](https://github.com/bounswe/bounswe2023group4/issues/311) | Resolver |
| Implement Poll Detail Screen UI | [#312](https://github.com/bounswe/bounswe2023group4/issues/312) | Resolver |
| Implement feed screen backend requests | [#362](https://github.com/bounswe/bounswe2023group4/issues/362) | Resolver |
| Implement Profile Screen Backend Requests | [#416](https://github.com/bounswe/bounswe2023group4/issues/416) | Resolver |
| Implement Poll Detail Screen Backend Requests | [#417](https://github.com/bounswe/bounswe2023group4/issues/417) | Resolver |
| Implement feed screen UI | [#266](https://github.com/bounswe/bounswe2023group4/issues/266) | Resolver |

### Pull requests:
| Task | Relevant Pull Requests |
| --- | --- |
| Profile Screen UI | [Mobile/profile #373](https://github.com/bounswe/bounswe2023group4/pull/373) |
| Poll Detail Screen UI | [created poll vote composable #337](https://github.com/bounswe/bounswe2023group4/pull/337) |
| Feed Screen Backend Requests | [Mobile/feature/feed UI #300](https://github.com/bounswe/bounswe2023group4/pull/300) |
| Profile Screen Backend Requests | [Profile and Feed Screens Finalized #438](https://github.com/bounswe/bounswe2023group4/pull/438) |
| Poll Detail Screen Backend Requests | [Mobile/feature/vote poll #339](https://github.com/bounswe/bounswe2023group4/pull/339), [Mobile/feature/vote poll #462](https://github.com/bounswe/bounswe2023group4/pull/462) |
| Feed Screen UI | [Mobile/feature/feed UI #300](https://github.com/bounswe/bounswe2023group4/pull/300) |

