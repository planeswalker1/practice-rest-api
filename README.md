# _practice-rest-api_

#### _A users api using rest, 01.01.2019_

#### By _**planeswalker1**_

## Description

_This repository has been created in order to showcase a programming challenge about apis, completed using express._

## challenge

Create a c.r.u.d. users api. clients should be able to create new users, get all users, get a single user, update a user (based on their id), and delete a user.

**Extra challenge**

* Don't insert values other than name/email/pw. reject creations if they don't have an email and pw, etc.

**Function Description**

following rest constraints, create app.get functions for each of the c.r.u.d. commands for a users db. The callback function should respond with a user; otherwise, respond with an error message.

The first endpoint should be:

```javascript
app.get('/users', function(req, res) {
  res.json(userDb);
 });
 ```

**Constraints**

Do not use:

* any external libraries (no more require() statements)

**Output Format**

respond with a user; otherwise, respond with an error message.

**Sample Url**

```
'/users'
```

**Sample Response**

```
'[{"id":0,"name":"Daniel Munoz","email":"daniel@munoz.com","password":"qwerty"}]'
```

## Setup/Installation Requirements

* _Clone repository_
* _Navigate to the cloned repository_
* _open app.js with code editor of choice to see my solution_

## Known Bugs

_I don't think there are any bugs_

## Support and contact details

_If you run into any issues or have questions, ideas or concerns contact me at daniel.munozdev@gmail.com_

## Technologies Used

_JavaScript_

_Node_
