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

