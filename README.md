# EWA Angular/Spring Boot Framework

## What's in the framework?

Back-end

- The server is set up with Spring Boot.
    - API: We use the CCU API, which can be found at `/sensors/data/api` & `/sensors/history`
    - Database: We have a connection to a database, so that all data and users can be safely stored. The database is on the HvA server.
- Passwords are hashed using the BCrypt encoder.

Front-end

- Bootstrap: for the design of the application, we used Bootstrap.
- ChartJs: for graphing charts we used the ChartJs library
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.


## Setup

### Dependencies - pre-install
- MySQL
- NodeJS - https://nodejs.org/en/download/
- TypeScript
- Git
- Spring Boot
- IntelliJ
- Fork

### Steps to run the framework for the first time

1. Copy the clone link from GitLab and use the link to clone the project into your pc with Fork.
2. Open project folder in IntelliJ.
3. Use the terminal function from IntelliJ and open the frontend folder. You can do this with `cd .\frontend\`.
4. In the frontend folder you need to install NPM. You do this with `npm install`.
5. If you open the project from IntelliJ you wil receive an alert to install the dependencies.
6. Everything is set up now! Go to your terminal and type in `cd .\frontend\`.
7. In the frontend folder you need to type in `ng serve`. This will run the frontend application.
8. In the top right corner press the play button. This will start the backend.

## Frontend directories

### Components

The frontend directory contains subdirectories for various Angular features, such as components.
All pages are created as components in the `.\frontend\src\app\components\` directory.
Subpages are placed either in the `components` directory or in the page's directory.
Components have an HTML file, a CSS file and a TS file for creating and controlling the content, and spec.ts file for testing.

### Models

A model in an MVC-based application is generally responsible for modelling the data used in the view and handling user interactions such as clicking on buttons, scrolling, or causing other changes in the view.
In basic examples, AngularJS uses the $scope object as the model.

### Services

A reusable Angular service is designed to encapsulate business logic and data with different components of Angular.
It is basically a class that has a well-defined purpose to do something.
You can create a service class for data or logic that is not associated with any specific view to share across components

### Shared

Creating shared modules allows you to organize and streamline your code.
You can put commonly used directives, pipes, and components into one module and then import just that module wherever you need it in other parts of your application.

## Backend directories

### Models

A Model represents formal underlying data constructs that the View uses to present the user with the look and feel of the application.

### Repositories

In Spring Boot, the repository is considered the Data Access Object.
It is responsible for performing various CRUD operations on objects and storing the data in some storage, such as a database.
A repository sits in between a controller and a storage.

### Rest

The Rest package contains the controllers of the application.
A controller class is responsible for handling interactions between Views and Models, and communicates with a repository.

Spring RestController annotation is used to create RESTful web services using Spring MVC.
Spring RestController takes care of mapping request data to the defined request handler method.
Once response body is generated from the handler method, it converts it to JSON or XML response. 

## Unit Tests

This section contains an overview of the unit tests per author.

### Hashim Mohammad
#### Backend
- TeamsController:
  - deleteTeam
- TeamRepository:
  - deleteById
- SensorRepository:
  - findByGhId
- SensorRepository:
  - getTimestampsByGhId
- SensorController:
  - postSensorData

#### Frontend
- Account component:
  - error when field left blank
  - error when password is wrong
  - change user password
- Settings service: 
  - save user information
- Settings service: 
  - get preferences


### Nazlıcan Eren
#### Backend
 - NotesController: 
   - delete note
 - NotesResource: 
   - add note
 - NotesRepository: 
   - add note
   - update note
   - delete note
   - find note

#### Frontend
 - Edit note component: 
   - show note information correct
 - Preferences component: 
   - get user preferences
 - Share note component: 
   - create note within the maximum characters
 - Add user component: 
   - error alert when the given email already exists 
 - Sensor service: 
   - get desired sensor values


### Mohamad Hassan
#### Backend

#### Frontend
