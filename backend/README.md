# Backend
Backend service for the live collaborative whiteboard application.
This backend is currently in the early setup stage and focuses on 
project structure, dependency setup, and foundational architecture 
before implementing business logic and real-time features.

## Project Initialization

The project was initialized using npm:
npm init -y
npm i nodemon --save-dev
npm i express pg cors dotenv bcrypt

## Folder Structure
backend/
|-- src
    |-- controller     
        |-- userCOntroller.js         # Request handlers
    |-- database       
        |-- db.js                     # PostgresSQL connection setup
    |-- middleware
        |-- middleware.js             # Custom middleware
    |-- routes
        |-- router.js                 # Main application router
        |-- userRoutes.js             # User-related routes
    |-- server
        |-- server.js                 # Server entry point
|-- .gitignore
|-- README.md
|-- package.json
|-- package-lock.json

## HTTP endpoints
http://localhost:8080/api/users/signup              # Signup endpoint for signup logic
http://localhost:8080/api/users/login               # Login endpoint for login logic
http://localhost:8080/api/users/update/:userId      # Change password endpoint
http://localhost:8080/api/users/delete/:userId      # Delete account endpoint