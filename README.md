# stickman-assignment-backend

RESTful API for user authentication made using Node, Express and MongoDB.

API hosted at https://api-stickman-assignment.herokuapp.com/ .

## API routes

- ### /signup

        POST
            email
            nickname
            password
            image

        GET
            Info for POST req parameters

- ### /login

        POST > redirects to /user/image with token authorisation
            email
            nickname
            password

        GET
            Info for POST req parameters

- ### /user/image
        Protected route, needs token as query parameter

        GET
            sends user image file
