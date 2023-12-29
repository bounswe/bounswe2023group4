# Cmpe451 Final Project Team Report
#### Prepared by:
**Video:** Link to video demo

### Executive Summary

Describe the product that you have delivered in terms of
* functionality
* technical description

#### Final release notes

### Status of Deliverables
List **all** deliverables as links. Specify the version numbers whenever applicable.

| Name        | Status           | Notes  |
| ------------- |:-------------:| -----:|
| Name of deliverable      | Not done/Completed/ X% completed | Optional notes |
| ...     | ...      |   ... |

### Requirements Coverage
| ID | Name        | Status           | Notes  |
| --- | ------------- |:-------------:| -----:|
| RID      | Specification | Status | Optional notes |
| ...     | ...      |   ... | ... |

(Status: One of: Not done , Completed , % completed )

### API
* Link to the application API with three example calls related to the core functionality
of your application.

### User Interface / User Experience

* User Interface designs and the links to the source code in the project repository
  * feature:
    * Web
    * Mobile
  * feature:
    * Web
    * Mobile
  * …

### Annotations
* Status:
* Compliance with W3C WADM:
* Implementation description
* API calls examples to annotation server:
  * textual annotation creation & retrieval
  * image annotation creation & retrieval

### Scenario:
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
5. As a quasi-social-network platform, the API allows users to socialize with each other. During our discussion with the PO, it envisaged that the users should be able to seek out each other on the basis of common interests. The leaderboard serves this purpose by allowing users to fetch the most invested users per each polling genre which is determined by its ubiquitous permeance across the internet. 

### Management
* Implemented Changes and their impact
* Reflections related to your Final Milestone Demo
* Lessons Learned

## Individual Report
