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
This is the root directory for the React App front end.

## Set-up

### Dependencies
- `service_backend`
  - OpenJDK @ version 11.0.12.
  - Maven @ version 3.8.1.
- `service_system`
  - Node.js @ version 14.0 or higher.
  - `npm` or `npx` or `yarn`.

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
