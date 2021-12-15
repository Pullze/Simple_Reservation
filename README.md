# Simple-Travel-Reservations-Service
*A simple react & sping-boot based gatech cs4400 project.*
*Produced by GT CS4400 Group 88:*
- *Huang, Qian*
- *Shang, Jiacheng*
- *Wang, Lai*
- *Zhao, Wantian*

## Introduction

### Structure
```bash
Simple-Travel-Reservations-Service
├── service_backend
│   ├── src
│   └── target
└── service_system
    ├── node_modules
    ├── public
    └── src
```
#### `service_backend`
This is the root directory for the Spring-boot based project's backend. We use Maven for project management.

#### `service_system`
This is the root directory for the React App frontend.

## Set-up

### Dependencies
- `service_backend`
  - OpenJDK @ version 11.0.12.
  - Maven @ version 3.8.1.
- `service_system`
  - Node.js @ version 14.0 or higher.
  - `npm` or `yarn`.

### Start Up Backend
1. Open the `service_backend` directory as a **Maven** projecet in any IDE you like.
2. Use `maven` to install all dependencies of the project before debugging/developing.
3. Configure `src/main/resources/application.properties`:
    - Change `spring.datasource.url` to the database you prefer.
    - Change `spring.datasource.username` to the database username.
    - Change `spring.datasource.password` to the password of your database username.
4. Initialize your database with the script with some dummy data that we provide.
5. Run `com/cs4400/service_backend/ServiceBackendApplication.java` to start the backend.
6. After starting up, a link to Swagger API Document will print in the console.
    - The default url should be: `http://localhost:8080/doc.html`

### Start Up Frontend
1. Open the `service_system` directory in your terminal/console/npx environment.
2. Install all packages used in the project:
    * Execute `yarn install` if you use `yarn`.
    * Execute `npm install` if you use `npm`.
3. Start the frontend React App:
    * Execute `yarn start` if you use `yarn`.
    * Execute `npm start server` if you use `npm`.
4. After starting up, a tab to `localhost:3000` will be opened in your browser, or you could go to this address by yourself.
5. Normally, the backend and frontend will automatically connect with each other.

## Technologies Used

### Backend

For the backend, we use the Spring Boot Architecture to build a RESTful web service. It consists of three layers: controller, service and mapper.  It receives HTTP GET, POST, and DELETE requests. 

We have six controllers marked by `@Restcontroller` including airline controller, airport controller, book controller, flight controller, property controller, and user controller. These controllers process incoming REST requests from the React front end. We have 14 entitie classes and 11 vo classes to save the information of “account”, “airline”, “airport”, “reserve”, etc. These classes improve the efficiency of processing the data belonging to one class. The controller receives requests from the frontend, and passes the variable to the service APIs.

In the service layer, we implements the corresponding APIs. We check the edge cases, process the data, update the MySQL Database through mappers. Interacting with the MySQL Database, we use the mybatis framework to prepare custom SQL queries to the database. The result finally returns to the controller and is passed back to the front end.

### Frontend
    
We use` React.js`, an open-source front-end JavaScript library, to build our user interfaces. These interfaces are styled with Ant Design, `antd`, a React UI library consisting of a set of React components. We also use `axios` to make HTTP requests to our API endpoints in the backend.

## Work Distribution

| Page                                           | Frontend | Backend           |
| ---------------------------------------------- | -------- | ----------------- |
| Login                                          | Lai      | Lai               |
| Register Owner                                 | Qian     | Jiacheng, Wantian |
| Admin Home                                     | Qian     | N/A               |
| Admin Schedule Flight                          | Qian     | Jiacheng          |
| Admin Remove Flight                            | Qian     | Jiacheng          |
| Admin View Airports                            | Lai      | Lai, Jiacheng     |
| Admin View Airlines                            | Lai      | Lai               |
| Admin View Customers                           | Lai      | Lai               |
| Admin View Owners                              | Lai      | Lai               |
| Admin Process Date                             | Lai      | Lai               |
| Customer Home                                  | Qian     | N/A               |
| Customer Book Flight                           | Qian     | Jiacheng          |
| Customer Cancel Flight                         | Qian     | Jiacheng          |
| Customer View Flights                          | Lai      | Jiacheng          |
| Customer Reserve Property                      | Qian     | Wantian           |
| Customer Cancel Property Reservation           | Qian     | Wantian           |
| Customer Review Property                       | Qian     | Wantian           |
| Customer Rate Owner                            | Qian     | Wantian           |
| Customer View Properties                       | Qian     | Wantian           |
| Customer View Individual Property Reservations | Qian     | Wantian           |
| Owner Home                                     | Qian     | N/A               |
| Owner Add Property                             | Qian     | Jiacheng          |
| Owner Remove Property                          | Lai      | Wantian           |
| Owner Rate Customer                            | Lai      | Jiacheng          |
| Owner Deletes Account                          | Lai      | Lai               |

