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

# API
* Link to the application API with three example calls related to the core functionality
of your application.

# User Interface / User Experience

* User Interface designs and the links to the source code in the project repository
  * feature:
    * Web
    * Mobile
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

### Management
* Implemented Changes and their impact
* Reflections related to your Final Milestone Demo
* Lessons Learned

# Individual Report
## Member: Ali Nasra
### Responsibilities: 
Throughout the project, my responsibilities encompassed multiple facets of the projects. Managerially, I was responsible for tracking the group's plan and confirming compliance with it. Technically, I served as a member of the support subteam which allowed me to contribute to both the backend and frontend subteams.
### Main contributions:
Over the last 4 months, I have revised both the design requirements and the UML diagrams, compiled each subteam's plan, and amalgamated them into a single general plan In addition, I partook in the preparation of each milestone report. For instance, in this report, I was responsible for shooting the demo video and writing the scenario. My contributions to the code base vacillate between my front-end and back-end duties. As an associate of the frontend subteam, I was responsible for implementing multiple pages such as the **sign-in** page, the **vote** page, and the **leaderboard** page with their concomitant backend integration. In addition, I was responsible for implementing the annotations' UI and integrating it with the Annotation server in a **W3C-compliant** manner. As an associate of the backend subteam, I was responsible for implementing the member follow/unfollow mechanisms. In addition, I implemented the leaderboard back-end endpoints. Finally, I implemented the functionality that helps update the badges of each user given their up-to-date standing in each topic.
### Overall description:
#### Code-related significant issues:
|Task|Issue|
|-|-|
|-|-|
|-|-|
|-|-|
#### Management-related significant issues:
|Task|Issue|
|-|-|
|-|-|
|-|-|
|-|-|
#### Pull requests:
|Task|PR|
|-|-|
|-|-|
|-|-|
|-|-|
#### Unit Tests:

#### Additional Information:
