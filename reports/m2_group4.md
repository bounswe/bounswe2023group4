# Project Status

## Backend Status
In the backend segment of the project, significant strides have been made, marking notable progress in various areas. The team successfully finalized Google authentication, enhancing the system's security and user convenience. A robust framework for creating, viewing, and participating in both discrete and continuous polls has been implemented, further enriched with features like image upload and viewing capabilities. The introduction of mock badges adds a layer of user engagement and gamification.

Additionally, a point system has been integrated, aligning with the implementation of poll closing functionalities. This development has been pivotal in advancing the project's dynamics around user interaction with polls. The maintenance, viewing, and updating of user profiles have been streamlined, ensuring a seamless user experience.

The backend team has also made significant improvements in error management, which is crucial for maintaining the system's stability and reliability. The implementation of email verification and authentication validation processes has bolstered the system's security infrastructure. Moreover, the introduction of automatic poll tagging has enhanced the system's efficiency in organizing and categorizing poll data.

To ensure the robustness of these implementations, a series of tests have been conducted, including poll service tests, profile service tests, and authorization service tests. However, it's noted that there is room for more exhaustive testing to further reinforce the system's reliability and performance. This aspect remains a focus for ongoing enhancement in the backend development process.

The present state of the project is indeed encouraging; however, substantial tasks await completion. The forthcoming phase will see the introduction of significant features such as a leaderboard, annotation system, and a moderation mechanism. Concurrently, there will be a concerted effort to refine and enhance existing endpoints, ensuring that their core functionalities remain unaltered. This approach underscores our commitment to continuous improvement while maintaining the integrity and efficiency of the system.

## Frontend Status
In the frontend development of the project, there has been considerable advancement with the addition of numerous key features, enhancing the overall user interface and experience. The team successfully introduced a Vote Poll Page and a Create Poll Page, which significantly improve user engagement by allowing them to actively participate in polls. The Authentication Page has been refined with added validation, bolstering the security and user verification process.

A notable achievement is the integration of the Leaderboard Page, which introduces a competitive element to the platform by displaying user rankings. This is complemented by the integration of a Point System with the backend, adding depth to user interactions on the platform.

Further enhancements include the addition of a Profile Page and an Edit Profile Page, enabling users to view and modify their personal information seamlessly. The Feed Page has been integrated, providing a dynamic and interactive space for users to engage with the latest content. The implementation of a Search Bar UI significantly improves the platform's navigability, allowing users to efficiently find specific polls or content.

Google Sign-In has been added as a feature, streamlining the login process and offering a convenient alternative to standard authentication methods. The team has also focused on improving the responsiveness of both Poll and Authentication pages, ensuring a smooth and user-friendly experience across different devices.

However, it is noted that the implementation of the Moderation Page UI is still pending. This aspect remains a key area for future development, as it is crucial for maintaining the platform's content quality and user interactions. The team aims to address this in subsequent updates to enhance the platform's overall functionality and user experience.

As we look towards future endeavors, our strategy aligns closely with the backend development objectives. However, a strategic shift will be implemented, directing our workforce's focus predominantly towards the enhancement of the user interface. This reallocation of resources is a tactical decision made while anticipating the completion of backend tasks. In parallel, it is noteworthy to mention that the progress in frontend development is proceeding in accordance with our projected timelines and expectations. 

## Mobile status
In the mobile development front of the project, significant advancements have been achieved, enhancing the app's interactivity and user experience. The introduction of a Profile Page allows users to view personal information, fostering greater user engagement. The Feed Page offers a dynamic and interactive stream of content, enriching the user experience with constantly updated material. With the Create Poll Page, users can now actively participate by creating polls, adding to the app's interactive capabilities.

The preliminary implementation of the Leaderboard, albeit with mock data, introduces a competitive edge to the app, which is expected to evolve once integrated with the backend. The authentication process has been streamlined and secured with the addition of page validation and Google Sign-In, making the app more user-friendly and secure. The transition from mock data to real data marks a significant move towards an authentic user experience.

The app's stability and functionality have been enhanced through bug fixes, addressing issues in authentication middleware and other operational crashes. The integration of an App Bar and Drawer improves navigation within the app, contributing to a better user interface. Furthermore, the support for DateTime in ISO8601 format ensures consistency and standardization in date and time representation across the app.

However, several areas have been identified for improvement. The Poll UI requires enhancement for better user interaction and visual appeal. The Profile Page is yet to be completed with additional functionalities like profile editing and badge display. The Leaderboard UI is set for an upgrade post its backend integration. Aesthetic consistency between the drawer and main app is also a focus, aiming to unify the app's overall design. Additionally, an increase in test coverage is necessary to ensure the app's reliability and functionality.

Overall, the mobile segment of the project has shown substantial progress in user engagement and app functionality, with a commitment to further improvements and feature expansions in subsequent updates.

In the upcoming phase of our project, we are dedicated to implementing a series of key enhancements and functionalities to further strengthen our platform. Foremost among these is the integration of a leaderboard system within our backend architecture, aimed at elevating the interactive and competitive elements of our platform. Concurrently, there will be a significant emphasis on expanding our testing coverage, a crucial step to ensure the robustness and dependability of our system. Additionally, we are set to introduce important features such as moderation and annotation, designed to enrich user interaction and control. Alongside these advancements, we are also committed to the continuous refinement of our user interface, focusing on enhancing user engagement and the overall user experience. These initiatives collectively underscore our ongoing dedication to evolving and improving our platform to meet and exceed user expectations.

# Customer Feedback and Reflections
The significance of choosing appropriate dates was highlighted in all sections of the platform that involve date selection.
- There were inquiries about the functionality of the Google sign-in method during the presentation.
- The customer requested a search for options in the multiple-choice poll.
- The customer showed interest in our automatic poll tagging system and later requested a different semantic tagging system.
- During the presentation, Semantic Search was recommended as a means to retrieve syntax-agnostic, more diverse relevant polls. Although our current system does not support this, we plan to incorporate it due to customer interest.
- The customer asked how to differentiate between closed and open polls.
- After polls are closed, the customer requested a plan outlining how the results will be displayed (e.g., graphs, charts) before its implementation in the project.
- The web design's color palette was deemed weak and hard to read. Customers have requested designs that are more legible for the web view.
- The customers suggested modifying our numeric input range to accept real numbers instead of just integers.

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
- Profile page is not completed we don't support some features like edit profile or badges.
- Leaderboard ui will be improved when we connect it to the backend.
- Drawer and main app looks differrent we may adjust their colors.
- Test coverage should be increased.

# List and Status of Deliverables
<ul>
  <li> Summary of the Project Status -> Completed </li>
  <li> Summary of the Customer Feedback and Reflections -> Completed </li>
  <li> Changes Since Milestone 1 and Future Plans -> Completed </li>
  <li> Progress According to Requirements -> Completed </li>
  <li> API documentation and endpoints -> Completed and Link Provided on the Report</li>
  <li> Unit test reports -> Completed </li>
  <li> Individual Contributions -> Completed </li>
  <li> Status of Annotation Features -> Provided on the Report </li>
  <li> Plans for Annotation -> Provided on the Report </li>
  <li> General Test Plan -> Provided on the Report </li>
</ul>
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
This endpoint currently returns the polls in the system with the main concern of creating the main feed.

#### GET /polls/{pollId}
Get a specific poll, using its pollId.

#### POST /polls/discrete
The endpoint for creating a discrete poll. Requires user to be logged in.

#### POST /polls/continuous
The endpoint for creating a continuous poll. Requires user to be logged in.

#### POST /polls/discrete/{pollId}/vote
The endpoint for voting on a discrete poll. Requires user to be logged in.

#### POST /polls/continuous/{pollId}/vote
The endpoint for voting on a continuous poll. Requires user to be logged in.

#### POST /polls/close/{pollId}
The endpoint for closing a poll, given its pollId. Currently only works on discrete polls. The way the points are redistributed is such that the winner users share the total points invested into the poll among themselves with a proportion of their points invested into the poll.

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

### Integration tests
Integration tests are not implemented yet.

# Test Plan & Strategy 
## Unit Testing:
Test cases are prepared with the conclusion of every unit. For instance, test cases to validate every developed page or constituent component UI are prepared with React's test package and deployed with the source code. The same case is valid for the backend and mobile teams.

## Integration Testing:
Relevant test cases are developed when intertwined components are developed concurrently. For instance, the mesh of the poll card component with the feed, vote, and profile pages is tested, or the connection between the Front-end interface and the Back-end server is verified.

## System Testing:
Each team member partakes in this testing phase by creating an account and testing all the features. fetching for bugs and observing the inter-subsystem interactions. This phase takes place following the conclusion of the development plan and before the final milestone. This phase might probably start on either the 11th or the 12th week.

## Acceptance Testing:
Friends and acquaintances shall be allowed to test the system with the help of the team members. The goal of this testing phase is to combine the perspectives of both the developers and the users. This testing phase shall take place following the System Testing phase and before the final milestone.

## Mock Data:
The mock data will cover both the general and edge cases so that the odds of encountering either heisenbugs or bohrbugs are minimalized. For instance, the case of betting with negative points before voting was tested during the integration phase between the front-end interface and the back-end server. 

# Status of Annotation Features
We have not started on annotation features as of this milestone.

# Plans For Annotation
We plan to implement the backend functionality of annotations before 2 weeks of the last milestone. We plan that annotations will be implemented for questions and choices. Annotations will be implemented with conformance to [W3C Web Annotation Data Model](https://www.w3.org/TR/annotation-model/).

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

## Member: Enes Furkan Arslan
### Responsibilities: 
My main responsibilites are implementing necessary components on frontend and make them functional by linking them with backend. Other than that I am responsible for updating the design of the project as necessarily. I am also responsible for preparing necessary deliverables for milestones and take part in the presentations according to the team's needs. Finally I am responsible for taking my part on the management of the project and reviewing the works done by other members of the team. 
### Main contributions: 
I have involved in significant processes between milestone 1 and milestone 2 from management to implementation aspects. Some of my management related contributions are updating the RAM after a group member leaved, organizing extra meetings with backend and frontend members for ongoing tasks and keep checking the progress of other tasks and reviewing them. About the implementation part I was responsible for every frontend aspects of creating a poll in the platform. This was one of the core functionalities of this milestone and the platform, therefore I gave my maximum effort and completed it succesfully as planned. I also took urgent tasks and get them completed, details are in the next section. 

### Code-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
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

### Management-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| RAM is updated after a team member has leaved|[#350](https://github.com/bounswe/bounswe2023group4/issues/350)|
| Updated the requirements according to feedbacks|[#486](https://github.com/bounswe/bounswe2023group4/issues/486)|
| Overview section added to requirements and glossary updated|[#488](https://github.com/bounswe/bounswe2023group4/issues/488)|
| Prepared progress based on each requirement for milestone 2 report|[#489](https://github.com/bounswe/bounswe2023group4/issues/489)|
| I have reviewed this issue and provided feedback, check for details|[#487](https://github.com/bounswe/bounswe2023group4/issues/487)| 

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
|Implemented create poll page's main UI components according to the mock-up|[#332](https://github.com/bounswe/bounswe2023group4/pull/332)|
|UI/UX of create poll page is improved and page made more user friendly, API request for create poll page is implemented in accordance with backend and database|[#374](https://github.com/bounswe/bounswe2023group4/pull/374)|
|Realized an error and fixed it immediately for back and front teams' progress|[#378](https://github.com/bounswe/bounswe2023group4/pull/378)|
|Added point indicator component to create poll page, Implemented a detailed input validation on create poll page and tested manually, Finalized create poll page's backend connection as changes occurred in swagger documentation, Re-implemented a feature of creating poll after realizing an inconsistency between mock up and requirements|[#445](https://github.com/bounswe/bounswe2023group4/pull/445)|
|Finalized authentication pages' backend connections|[#446](https://github.com/bounswe/bounswe2023group4/pull/446)|
|Implemented unit tests for create poll page to test its functionality|[#457](https://github.com/bounswe/bounswe2023group4/pull/457)|
|I have reviewed following PRs and there were no conflicts or any inconsistencies therefore thay have been merged succesfully|[#329](https://github.com/bounswe/bounswe2023group4/pull/329), [#341](https://github.com/bounswe/bounswe2023group4/pull/341),[#383](https://github.com/bounswe/bounswe2023group4/pull/383),[#398](https://github.com/bounswe/bounswe2023group4/pull/398),[#470](https://github.com/bounswe/bounswe2023group4/pull/470)|
|In the following PR some of the previous features have been corrupted due to new changes, so I requested changes on the PR. conflicts resolved on the same branch and then merged.|[#330](https://github.com/bounswe/bounswe2023group4/pull/330)|
|Added unit test reports for sign-up and create poll pages, Added progress based on requirements, Added self contribution|[#484](https://github.com/bounswe/bounswe2023group4/pull/484)| 

### Additional information:
I have tried to organize team progress by arranging extra meetings for tasks when necessary. I also reminded the deadlines for significant tasks so that team progress did not fail. I also took part in the presentation by setting up technical devices accordingly with our scenario and I have managed devices during the presentation as our presenter proceeded with the scenario. I answered to questions about the project coming from PO and audience when necessary. Finally I communicated with the PO and got feedbacks for milestone 1. Then I moderated a meeting to share tasks for milestone 2 report together with addressing feedbacks I got. I have updated the requierments page according to the feedbacks. 

## Member: Şefik Palazoğlu
### Responsibilities: 
Setting up backend system logic. Ensuring endpoints are working correctly. Implementing polls endpoints. Implementing internal poll subject tagging.
### Main Contributions:
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
|Task|Relevant significant issues| My duty |
| --- | --- | --- |
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

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
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

## Member: Yiğit Şekerci
### Responsibilities: 
Improving mobile flow and desing. Updating mobile plan with respect the unexpected changes. Implementing the half of the features in mobile.
### Main Contributions:
* In management aspect:
  -  I have updated mobile plan and arranged the tasks in the mobile team.
* In project aspect:
  -  I have helped to overcome archicture issues in project.
* In code aspect:
  -  I have implemented leaderboard screen UI
  -  I have implemented create poll screen UI
  -  I have implemented create poll screen backend requests
  -  I have implemented additional tests to increase code coverage.
  -  I have implemented validation to auth pages.
  -  I have refactored the mobile code the eliminate generic issues
  -  I have improved mobile flow and design by aligning the mobile app with front end.

### Code-related significant issues:
|Task|Relevant significant issues| My duty |
| --- | --- | --- |
|Implement Leaderboard Screen UI| [#313](https://github.com/bounswe/bounswe2023group4/issues/313)| Resolver |
|Implement Create Poll Screen UI| [#314](https://github.com/bounswe/bounswe2023group4/issues/314)| Resolver |
|Update Mobile Project Plan| [#315](https://github.com/bounswe/bounswe2023group4/issues/315)| Resolver |
|Increase Mobile App tests' code coverage| [#317](https://github.com/bounswe/bounswe2023group4/issues/317)| Resolver |
|Add validation to auth pages| [#318](https://github.com/bounswe/bounswe2023group4/issues/318)| Resolver |
|Implement create poll screen backend request| [#361](https://github.com/bounswe/bounswe2023group4/issues/361)| Resolver |
|Mobile refactor| [#460](https://github.com/bounswe/bounswe2023group4/issues/460)| Resolver |
|Improve Mobile Flow and design| [#466](https://github.com/bounswe/bounswe2023group4/issues/466)| Resolver |
| Implement profile screen UI | [#311](https://github.com/bounswe/bounswe2023group4/issues/311) | Reviewer |
| Implement Poll Detail Screen UI | [#312](https://github.com/bounswe/bounswe2023group4/issues/312) | Reviewer |
| Implement feed screen backend requests | [#362](https://github.com/bounswe/bounswe2023group4/issues/362) | Reviewer |
| Implement Profile Screen Backend Requests | [#416](https://github.com/bounswe/bounswe2023group4/issues/416) | Reviewer |
| Implement Poll Detail Screen Backend Requests | [#417](https://github.com/bounswe/bounswe2023group4/issues/417) | Reviewer |
| Implement feed screen UI | [#266](https://github.com/bounswe/bounswe2023group4/issues/266) | Reviewer |

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
| Auth page validation | [PR#331](https://github.com/bounswe/bounswe2023group4/pull/331) |
| Leaderboard UI | [PR#340](https://github.com/bounswe/bounswe2023group4/pull/340) |
| Create Poll page | [PR#435](https://github.com/bounswe/bounswe2023group4/pull/435) |
| UI Fixes (Refactor task) | [PR#461](https://github.com/bounswe/bounswe2023group4/pull/461) |
| Milestone 2 Prep for mobile (Align mobile and front) | [PR#467](https://github.com/bounswe/bounswe2023group4/pull/467) |
| Add additional tests for create poll | [PR#468](https://github.com/bounswe/bounswe2023group4/pull/468) |

### Additional Information:
I have also taken the notes in the milestone 2 presentation.
