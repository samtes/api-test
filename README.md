# Api-test
This is a project that exposes some simple APIs for testing.

##APIs
###Registration

```
Request: POST /register
Payload: {
  email: "user_email@email.com",
  password: "Password1",
  confirmPassword: "Password1"
}

Response:
Successful: 201
{
  user: { created user object }
}

Unsuccessful:
400 Bad request => Issue with payload (Email and password validation errors and mismatch passwords ...)
422 User already exists => Duplicate email

```

###Login

```
Request: POST /login
Payload: {
  email: "user_email@email.com",
  password: "Password1"
}

Response:
Successful: 200
{
  token: "token_string_for_authenticated_request",
  userID: "user_id_string"
}

Unsuccessful:
400 Bad request => Issue with payload (Email and password validation errors)
404 User not found => Email and passwords don't match
```

###Logout

```
Request: DELETE /login

Response:
200
```

###Users

```
Request: GET /users
headers: {
  session-id: "token_string_for_authenticated_request"
}

Response:
Successful: 200
{ users: [
  {
    "_id": "5673b48811d8971f00648269"
    "email": "sam@test.com"
    "password": "$2a$08$N1HrGqqF19IrJLZ5VxpLteCHyqa9gyFmJZkKhf1twFccJqlMxYpNW"
    "updatedAt": "2015-12-18T07:23:50.882Z"
    "createdAt": "2015-12-18T07:23:50.882Z"
    "role": "admin"
  },
  {
    "_id": "5673b55611d8971f0064826b"
    "email": "jim@test.com"
    "password": "$2a$08$60WjY1GCIZAv60dbOs7uPOsGUJKopBRzpMyKIPcRXp0fNUYX0y6HG"
    "updatedAt": "2015-12-18T07:27:18.377Z"
    "createdAt": "2015-12-18T07:27:18.377Z"
    "role": "user"
  },
  {
    "_id": "5673b56511d8971f0064826c"
    "email": "ron@test.com"
    "password": "$2a$08$HNS9nCLKcWrmCfK5/pstSubKD1hxJFumhuVRknZ73.b1FIF0.DUXm"
    "updatedAt": "2015-12-18T07:27:32.939Z"
    "createdAt": "2015-12-18T07:27:32.939Z"
    "role": "user"
  }
]}


Unsuccessful:
401 User not authorized => User with unauthenticated session or with out the proper role/right
```
###User

```
Request: GET /users/5673b48811d8971f00648269
headers: {
  session-id: "token_string_for_authenticated_request"
}

Response:
Successful: 200
{
  user: {
  	"_id": "5673b48811d8971f00648269"
  	"email": "sam@test.com"
  	"password": "$2a$08$N1HrGqqF19IrJLZ5VxpLteCHyqa9gyFmJZkKhf1twFccJqlMxYpNW"
  	"updatedAt": "2015-12-18T07:23:50.882Z"
  	"createdAt": "2015-12-18T07:23:50.882Z"
  	"role": "admin"
  }
}

Unsuccessful:
401 User not authorized => User with unauthenticated session or with out the proper role/right

Request: PUT /users/5673b48811d8971f00648269
headers: {
  session-id: "token_string_for_authenticated_request"
}
Payload: *requires at least one value to be updated
{
  email: "the_new_email@test.com",
  password: "The_new_password1"
}

Response:
Successful: 201
{
  message: "User successfully updated."
}

Unsuccessful:
401 User not authorized => User with unauthenticated session or with out the proper role/right
404 User not found => User is not found
400 Bad request => Invalid email or password
422 Not created => Email is already taken

*User has to be an Admin for this request

Request: DELETE /users/5673b48811d8971f00648269
headers: {
  session-id: "token_string_for_authenticated_request"
}

Response:
Successful: 201
{
  message: "User successfully deleted."
}

Unsuccessful:
400 Invalid request => email is missing from payload
404 Not found => User is not found
```
