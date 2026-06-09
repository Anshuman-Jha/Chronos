# Server Source Directory Documentation

## Overview
The `server/src` directory contains the core logic of the backend application. It follows a classic Model-View-Controller (MVC) - or more accurately, Controller-Service-Route - architecture to organize API logic, database interactions, and server configuration.

## Role of Each Part

### `index.ts`
- **Role**: The Entry Point. Initializes the Express application, configures global middleware (CORS, JSON parsing), connects to the database, and starts the server. It is the "main" file that boots up the backend.

### `controllers/`
- **Role**: Request Handlers. Contains the functions that directly handle incoming HTTP requests. They parse the request body/params, call the necessary business logic (often interacting with the database), and send back the appropriate HTTP response.

### `routes/`
- **Role**: API Definitions. Maps HTTP endpoints (URL paths) to specific controller functions. It defines the public interface of the API.

### `middleware/`
- **Role**: Request Interceptors. specific logic that runs *before* the request reaches the controller. Used for cross-cutting concerns like authentication checks, logging, or error handling.

### `prisma/`
- **Role**: Database ORM Layer. Contains the Prisma schema (database definition) and migration history. It serves as the bridge between the TypeScript code and the database.
