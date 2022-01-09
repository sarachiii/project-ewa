# EWA Angular/Springboot framework

## What's in the framework?

Back-end

- The server is set up with Springboot.
    - API: We use the ccu API, which can be found at `/dashboard` & `/sensor`
    - Database: We have a connection to a database, so that all data and users can be stored safely. The database is on the HvA server.
- We hash the passwords using BCrypt encoder.

Front-end

- Bootstrap: we did use bootstrap for the design of the application.
- ChartJs: for the charts we dit use the ChartJs js library


## Setup

### Dependencies - pre-install
- MySQL
- NodeJS - https://nodejs.org/en/download/
- TypeScript
- Git
- Springboot
- InteliJ
- Fork

### Steps to run the framework for the first time

1. Copy clone link from GitLab and use the link to clone the project into your pc with Fork.
2. Open project folder in Intelij.
3. Use the terminal function from InteliJ and open the frontend folder. You can do this with `cd ./frontend`.
4. In the frontend folder you need to install NPM. You do this with `npm install`.
5. If you open the project from inteliJ you wil receive an alert to install the inpendencies.
6. Everything is set up now! Go to your terminal and type in `cd ./frontend`.
7. In the frontend folder you need to type in `ng serve`. This will run the frontend application.
8. In the top right corner press the play button. This will start the backend.

## Frontend folders

### Components

In the frontend folder you will see different folders. we have all kinds of files divided into different folders. All pages are in the `frontend/src/app/components` folder. the components have HTML, CSS, spec.ts and TypeScript files.

### Models

The model in an MVC-based application is generally responsible for modeling the data used in the view and handling user interactions such as clicking on buttons, scrolling, or causing other changes in the view. In basic examples, AngularJS uses the $scope object as the model.

### Services

A reusable Angular service is designed to encapsulate business logic and data with different components of Angular. It is basically a class that has a well-defined purpose to do something. You can create a service class for data or logic that is not associated with any specific view to share across components

### Shared

Creating shared modules allows you to organize and streamline your code. You can put commonly used directives, pipes, and components into one module and then import just that module wherever you need it in other parts of your application.

## Backend folders

### Models

The Model represents formal underlying data constructs that the View uses to present the user with the look and feel of the application.

## Repositories

In Spring Boot, the controller class is responsible for processing incoming REST API requests, preparing a model, and returning the view to be rendered as a response. These mark controller classes as a request handler to allow Spring to recognize it as a Restful service during runtime.

## Rest

Spring RestController annotation is used to create RESTful web services using Spring MVC. Spring RestController takes care of mapping request data to the defined request handler method. Once response body is generated from the handler method, it converts it to JSON or XML response.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.
