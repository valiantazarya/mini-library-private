# mini-library-private

How to run in Local
1. npm install (install all dependencies)
2. npm start (start the application)

How to run with Docker
1. npm install (install all dependencies)
2. docker run -p <port>:8080 -d <app-name>

Getting Started
There are 4 API in this package
1. GET | Get All Books by Subject | http://localhost:8080/api/books?subject=<subject>limit=<limit>&offset=<offset>
  Responses:
  -> 200 OK, Request Accepted the requested resource or data is in the response body, even if it is empty.
  -> 400 Bad Requests, The request was not valid. This code is returned when the server has attempted to process the request, but some aspect of the request is not valid.
  -> 404 Not Found, Targeted resource does not exist, This might be because the URI is malformed, or the resource has been deleted.

2. POST | Submit Pickup Schedule | 
  Responses:
  -> 201 CREATED, New Pickup Schedule created successfully.
  -> 404 Not Found, Targeted resource does not exist, This might be because the URI is malformed, or the resource has been deleted.
  -> 500 Internal Server Error, Internal error occurred in the server.

3. GET | Get All Pickup Schedules
  Responses:
  -> 200 OK, Request Accepted the requested resource or data is in the response body, even if it is empty.
  -> 400 Bad Requests, The request was not valid. This code is returned when the server has attempted to process the request, but some aspect of the request is not valid.
  -> 404 Not Found, Targeted resource does not exist, This might be because the URI is malformed, or the resource has been deleted.

4. GET | Get Pickup Schedules by UUID
  Responses:
  -> 200 OK, Request Accepted the requested resource or data is in the response body, even if it is empty.
  -> 400 Bad Requests, The request was not valid. This code is returned when the server has attempted to process the request, but some aspect of the request is not valid.
  -> 404 Not Found, Targeted resource does not exist, This might be because the URI is malformed, or the resource has been deleted.