## Changes Since Milestone 1 and Future Plans

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


## API documentation

### API documentation link
http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/api-docs
[Uploading Swagger UI.html…]()

### API link
http://ec2-3-121-205-89.eu-central-1.compute.amazonaws.com:8000/

#### Note
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

