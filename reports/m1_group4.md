# Software Requirements Specification
<ul>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Software-Requirements-Specifications">Software Requirements Specification</a> </li>
</ul>

# Software Design (UML diagrams)
<ul>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/UML---Class-Diagram">Class Diagram</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/UML-Sequence-Diagrams">Sequence Diagrams</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/UML-Use-Cases-Diagram">Use Cases Diagram</a> </li> 
</ul>

# Scenarios and Mockups
<ul>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Mock-up">Mock Up</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Use-case:-User-registration-and-login">Use Case: User registration and login</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Use-Case:-Profile">Use Case: Profile</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Use-Case:-Poll-Interaction">Use Case: Poll Interaction</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Use-case:-Poll-creation">Use case: Poll creation</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Use-Case:-Search-Polls">Use Case: Search Polls</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Use-Case:-Vote">Use Case: Vote</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Use-Case:-Moderation">Use Case: Moderation</a> </li>
  <li> <a href="https://github.com/bounswe/bounswe2023group4/wiki/Use-Case:-View-and-Share-Leaderboard">Use Case: View and Share Leaderboard</a> </li>
</ul>

# Project Plan, Communication Plan, Responsibility Assignment Matrix
<ul>
  <li><a href="https://github.com/bounswe/bounswe2023group4/wiki/Frontend-Project-Plan">Frontend Plan</a></li>
  <li><a href="https://github.com/bounswe/bounswe2023group4/wiki/Backend-Project-Plan">Backend Plan</a></li>
  <li><a href="https://github.com/bounswe/bounswe2023group4/wiki/Mobile-Project-Plan">Mobile Plan</a></li>
  <li><a href="https://github.com/bounswe/bounswe2023group4/wiki/Communication-Plan-New-Semester">Communication Plan</a></li> 
  <li><a href="https://github.com/bounswe/bounswe2023group4/wiki/RAM">RAM</a></li> 
  
</ul>

# Weekly reports and any additional meeting notes
<ul>
  <li><a href="https://github.com/bounswe/bounswe2023group4/blob/main/reports/lab_report_1.md">Weekly Report 1</a></li>
  <li><a href="https://github.com/bounswe/bounswe2023group4/blob/main/reports/lab_report_2.md">Weekly Report 2</a></li>
  <li><a href="https://github.com/bounswe/bounswe2023group4/blob/main/reports/lab_report_3.md">Weekly Report 3</a></li>
  <li><a href="https://github.com/bounswe/bounswe2023group4/blob/main/reports/lab_report_4.md">Weekly Report 4</a></li>
</ul>

# Milestone Review 
## A summary of the project status and any changes that are planned for moving forward.
### Backend project status
<ul>
  <li>Authorization with access and refresh tokens is working.</li>
  <li>Google log in mechanism is implemented but currently collects data only on backend.</li>
  <li>Registration mechanism is working and is connected to database.</li>
</ul>

### Backend plans
<ul>
  <li>Google log in mechanism will be finalized.</li>
  <li>Poll endpoints will be working</li>
  <li>Profile endpoints will be working</li>
</ul>

## A summary of the customer feedback and reflections.
<ul>
  <li>‘Access token’ should not be visible on UI.</li>
  <li>Poll topics should be predictable.</li>
  <li>Be more clear about the poll's status on UI.</li>
</ul>

## List and status of deliverables.

## Evaluation of the status of deliverables and its impact on your project plan (reflection).

## Evaluation of tools and processes you have used to manage your team project.
### Backend
<ul>
  <li>Node.js has stalled the team a bit since it was kind of new among the team</li>
  <li>MySql was easy for team to use. Team easily designed tables and database was easily deployed. Plus connections from the local machines to deployed database was set which made controlling deployed database easier</li>
</ul>

## The requirements addressed in this milestone.
<ul>
  <li>1.1.2.1.1 Users should be able to sign up with an unused e-mail, unused nickname and a password.</li>
  <li>1.1.2.1.2 Passwords determined by users while signing up shall be at least 8 characters and shall contain at least three of the following:<ul>
<li>Lower case letters (a-z)</li>
<li>Upper case letters (A-Z)</li>
<li>Numbers (0-9)</li>
<li>Special characters (e.g. !@#$%^&*)</li></ul></li>
  <li>1.1.2.1.4 Users should be able to sign up with google.</li>
  <li>Users should be able to sign in with google.</li>
</ul>
  


# Individual Contributions

## Member: Emre Batuhan Göç
### Responsibilities: 
Setting up backend endpoints and their logic. Ensuring frontend can reach backend.Preparing swagger documentation for backend.
### Main contributions: 
I have opened the routes for sign up, log in, logout, access token request endpoints. I have created service class for these endpoints and filled them with logic. I have created swagger documentation for these endpoints. I have written unit tests for these endpoints. I have created a google log in system however it currently only sends the data to backend. I have helped database configuration. I have helped frontend to create requests for backend. I took part in the issue of updating diagrams where I revised 6 of the sequence diagrams and I revised the class diagram.

### Code-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
|I took part in the issue of updating diagrams where I revised 6 of the sequence diagrams and I revised the class diagram|[#143](https://github.com/bounswe/bounswe2023group4/issues/143), [#144](https://github.com/bounswe/bounswe2023group4/issues/144),[#161](https://github.com/bounswe/bounswe2023group4/issues/161)| 
| I have written unit tests for sign up, log in, logout, access token request endpoints|[#210](https://github.com/bounswe/bounswe2023group4/issues/210)|
| I have opened the routes for the aforementioned endpoints with logic-populated service class|[#211](https://github.com/bounswe/bounswe2023group4/issues/211)|
 I have created swagger documentation for these endpoints|[#232](https://github.com/bounswe/bounswe2023group4/issues/232)|
| Added some parameters to sign up endpoints|[#247](https://github.com/bounswe/bounswe2023group4/issues/247)|
| I have created a google log in system however it currently only sends the data to backend|[#248](https://github.com/bounswe/bounswe2023group4/issues/248)|
| I have helped database configuration|[#250](https://github.com/bounswe/bounswe2023group4/issues/250)|
| I have helped frontend to create requests for backend|[#257](https://github.com/bounswe/bounswe2023group4/issues/257)|

### Management-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| I took part in the subteam seperation management|[#141](https://github.com/bounswe/bounswe2023group4/issues/141)|
| I oversaw the update of diagrams. I seperated the work and finalized some of the diagrams|[#143](https://github.com/bounswe/bounswe2023group4/issues/143)|
| I took part in the backend tech selection|[#154](https://github.com/bounswe/bounswe2023group4/issues/154)|

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
|I have written unit tests for sign up, log in, logout, access token request endpoints|[#282](https://github.com/bounswe/bounswe2023group4/pull/282)|
| I have created a google log in system however it currently only sends the data to backend|[#275](https://github.com/bounswe/bounswe2023group4/pull/275)|
| Added some changes so that frontend can connect|[#270](https://github.com/bounswe/bounswe2023group4/pull/270)|
| Added some parameters to sign up endpoint|[#267](https://github.com/bounswe/bounswe2023group4/pull/267)|
| I have opened the routes for the aforementioned endpoints with logic-populated service class|[#243](https://github.com/bounswe/bounswe2023group4/pull/243)|
| I have created swagger documentation for these endpoints|[#240](https://github.com/bounswe/bounswe2023group4/pull/240)|
| I have initialized backend|[#194](https://github.com/bounswe/bounswe2023group4/pull/194)|

### Additional information:
I have tried to resolve all misunderstandings and code problems related to backend . I have helped my teammates with their work when needed and I recieved help when I encountered problems. I tried to keep the communication alive by managing the discord channels. I wanted to make sure backend related work was always on track so I asked my teammates about their status on the work. I hope I did not cause any unnecessary stress in the team :).
## Member: Ali Nasra
### Responsibilities: 
My responsibilities mainly revolve around providing aesthetic and decent UI designs as an associate of the front-end team while assisting the back-end team in case of an issue.
### Main contributions: 
My contributions incorporate reviewing the design requirements, revising the UML diagrams, implementing the UI of the sign-in page, and integrating the page with the backend server.
### Code-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| Learning CSS, React, Javascript, and other relevant technologies to front-end development  | https://github.com/bounswe/bounswe2023group4/issues/187 , https://github.com/bounswe/bounswe2023group4/issues/188 , https://github.com/bounswe/bounswe2023group4/issues/189 , https://github.com/bounswe/bounswe2023group4/issues/190 , https://github.com/bounswe/bounswe2023group4/issues/191 , https://github.com/bounswe/bounswe2023group4/issues/192 |
| Implementing the UI of the sign-in page | https://github.com/bounswe/bounswe2023group4/issues/205 |
| Implementing the UI for poll cards | https://github.com/bounswe/bounswe2023group4/issues/256 |
| Integrating the UI of the sign-in page with the frontend server | https://github.com/bounswe/bounswe2023group4/issues/257 |
| Discussing the implementation of tables in the backend | https://github.com/bounswe/bounswe2023group4/issues/241 |


### Management-related significant issues:
|Task|Relevant significant issues|
| --- | --- |
| Revising the sequence diagrams 1-6 | https://github.com/bounswe/bounswe2023group4/issues/147 |
| Reviewing and updating requirements pertinent to semantic annotation  | https://github.com/bounswe/bounswe2023group4/issues/165 |

### Pull requests:
|Task|Relevant Pull Requests|
| --- | --- |
| Implementing the UI of the sign-in page| https://github.com/bounswe/bounswe2023group4/pull/236 |
| Integrating the sign-in UI with the backend | https://github.com/bounswe/bounswe2023group4/pull/268 |
| Updating the request mechanism to fit the deployment settings | https://github.com/bounswe/bounswe2023group4/pull/278  |
| Writing tests for the sign-in UI | https://github.com/bounswe/bounswe2023group4/pull/288 |

### Additional information:
The poll cards should have been fully implemented. Indeed, a prototype design was submitted for the UI of discrete poll cards, but due to the urgency of the deployment pending the first milestone presentation, the task was delegated to Selin Işık, who thankfully and dutifully completed it.  
