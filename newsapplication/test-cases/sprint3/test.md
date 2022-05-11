| Test Case ID  | Description/Summary  | Test Steps | Pre-requisite | Author  | 
| ------------- | -------------------- | ---------- | ------------- | ------- |
|1             | landing page        | goto localhost | application and server running | Nikita|
|2           | landing page news        | goto localhost | api, application and server running | Nikita|
|3              | Click Sign up/ Register|  Fill all information and click Register |link to the application and server running | Nikita |
|4              | Click Sign up/ Register| Do not add all information and click Register|link to the application and server running | Nikita |
|5             | Enter a valid set of credentials           | Click on Login  |link to the application and server running| Nikita|
|6              | Enter a set of credentials that does not exist in DB         | Click Sign in/ Login|link to the application and server running | Nikita|
|7              | Click Login         | Goto Home tab on the user dashboard  |link to the api, application and server running | Nikita|
|8              | Validate news articles listing     |Test for pagination -News articles displayed in chunks of 20  |link to the api, application and server running | Nikita|
|9              | Click on different page numbers in the pagination on landing        |The articles should be displayed in sequence of order by page |link to the api, application and server running | Nikita|
|10            | dashboard      |fetch the  News   |link to the api, application and server running | Nikita|
|11             | Goto Settings and change the user preference categories      | fetch the updated News category preferences of the user saved in DB |link to the api, application and server running | Nikita| 
|12            | refresh        | fetch the  News |link to the api, application and server running | Nikita|
