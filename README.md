# mini-library-private

How to run in Local
1. npm install (install all dependencies)
2. npm start (start the application)

How to run with Docker
1. docker build . -t <app-name>
2. docker run -p <port>:8080 -d <app-name>

Getting Started
There are 4 API in this package
1. GET | Get All Books by Subject | http://<url>:<port>/api/books?subject=<subject>limit=<limit>&offset=<offset>
  Request Body: -
  Responses:
  -> 200 OK, Request Accepted the requested resource or data is in the response body, even if it is empty.
    Response body:
    {
      "status": "success",
      "error_message": null, 
      "data": [
        {
          "id": 2239510,
          "key": "/works/OL1456989W",
          "title": "De hominis dignitate",
          "authors": [
            {
              "key": "/authors/OL153890A",
              "name": "Giovanni Pico della Mirandola"
            },
            {
              "key": "/authors/OL2477978A",
              "name": "Patricia Mari-Fabre"
            }
          ],
          "edition_number": 31
        },
      ]
    }
  -> 400 Bad Requests, The request was not valid. This code is returned when the server has attempted to process the request, but some aspect of the request is not valid.
    Response body:
    {
      "status": "failed",
      "error_message": "Failed to process the request because of malformed request syntax or invalid request message framing",
      "data": null
    }
  -> 404 Not Found, Targeted resource does not exist, This might be because the URI is malformed, or the resource has been deleted.
    Response body:
    {
      "status": "failed",
      "error_message": "The resource is missing or not found"
      "data": null
    }

2. POST | Submit Pickup Schedule | http://<url>:<port>/api/books/pickup-schedules
  Request Body:
    {
      "cover_id": 2239510,
      "key": "/works/OL1456989W",
      "title": "De hominis dignitate",
      "authors": [
        {
          "key": "/authors/OL153890A",
          "name": "Giovanni Pico della Mirandola"
        },
      ],
      "edition_number": 15,
      "pickup_date": "2022-12-23 08:30:00"
    }
  Responses:
  -> 201 CREATED, New Pickup Schedule created successfully.
    Response body:
    {
      "status": "success",
      "error_message": null, 
      "data": [
        {
          "uuid": "",
          "cover_id": 2239510,
          "key": "/works/OL1456989W",
          "title": "De hominis dignitate",
          "authors": [
            {
              "key": "/authors/OL153890A",
              "name": "Giovanni Pico della Mirandola"
            },
            {
              "key": "/authors/OL2477978A",
              "name": "Patricia Mari-Fabre"
            }
          ],
          "edition_number": 15,
          "pickup_date": "2022-12-23 08:30:00"
        }
      ]
    }
  -> 400 Bad Requests, The request was not valid. This code is returned when the server has attempted to process the request, but some aspect of the request is not valid.
    Response body:
    {
      "status": "failed",
      "error_message": "Failed to process the request because of malformed request syntax or invalid request message framing",
      "data": null
    }
  -> 404 Not Found, Targeted resource does not exist, This might be because the URI is malformed, or the resource has been deleted.
    Response body:
    {
      "status": "failed",
      "error_message": "The resource is missing or not found"
      "data": null
    }

3. GET | Get All Pickup Schedules | http://<url>:<port>/api/books/pickup-schedules
  Request Body: -
  Responses:
  -> 200 OK, Request Accepted the requested resource or data is in the response body, even if it is empty.
  -> 400 Bad Requests, The request was not valid. This code is returned when the server has attempted to process the request, but some aspect of the request is not valid.
    Response body:
    {
      "status": "failed",
      "error_message": "Failed to process the request because of malformed request syntax or invalid request message framing",
      "data": null
    }
  -> 404 Not Found, Targeted resource does not exist, This might be because the URI is malformed, or the resource has been deleted.
    Response body:
    {
      "status": "failed",
      "error_message": "The resource is missing or not found"
      "data": null
    }

4. GET | Get Pickup Schedules by UUID | http://<url>:<port>/api/books/pickup-schedules/<uuid>
  Request Body: -
  Responses:
  -> 200 OK, Request Accepted the requested resource or data is in the response body, even if it is empty.
  -> 400 Bad Requests, The request was not valid. This code is returned when the server has attempted to process the request, but some aspect of the request is not valid.
    Response body:
    {
      "status": "failed",
      "error_message": "Failed to process the request because of malformed request syntax or invalid request message framing",
      "data": null
    }
  -> 404 Not Found, Targeted resource does not exist, This might be because the URI is malformed, or the resource has been deleted.
    Response body:
    {
      "status": "failed",
      "error_message": "The resource is missing or not found"
      "data": null
    }