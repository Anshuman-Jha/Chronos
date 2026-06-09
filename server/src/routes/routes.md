# Routes Directory Documentation

## Overview
The `server/src/routes` directory defines the API endpoints exposed by the server. It maps specific HTTP methods and URL paths to controller functions.

## Detailed Endpoint Breakdown

### Auth Routes (`/auth`)
- **POST `/register`**
    - **Purpose**: Creates a new user account.
    - **Body**: user details (username, email, password etc.)
    - **Response**: The created user object and possibly an auth token.
- **POST `/login`**
    - **Purpose**: Authenticates an existing user.
    - **Body**: credentials (email, password).
    - **Response**: An authentication token (JWT) and user details.

### Project Routes (`/projects`)
- **GET `/`**
    - **Purpose**: Retrieves a list of projects.
    - **Context**: Often filtered by the logged-in user's team or access rights.
- **POST `/`**
    - **Purpose**: Creates a new project.
    - **Body**: Project name, description, deadline, etc.

### Task Routes (`/tasks`)
- **GET `/`**
    - **Purpose**: Retrieves a list of tasks.
    - **Query Params**: Likely supports filtering by project, priority, or status.
- **POST `/`**
    - **Purpose**: Creates a new task.
    - **Body**: Task title, description, priority, assignee, etc.
- **PATCH `/:taskId/status`**
    - **Purpose**: Updates the status of a specific task (e.g., "To Do" -> "In Progress").
    - **Path Param**: `taskId` - The ID of the task to update.
    - **Body**: New status value.
- **GET `/user/:userId`**
    - **Purpose**: Retrieves all tasks assigned to a specific user.
    - **Path Param**: `userId` - The ID of the user.

### User Routes (`/users`)
- **GET `/`**
    - **Purpose**: Retrieves a list of all users. Useful for search or assignment dropdowns.
- **GET `/me`**
    - **Purpose**: Retrieves the profile information of the *currently authenticated* user.
- **GET `/:userId`**
    - **Purpose**: Retrieves public profile information for a specific user ID.

### Team Routes (`/teams`)
- **GET `/`**
    - **Purpose**: Retrieves a list of teams.

### Search Routes (`/search`)
- **GET `/`**
    - **Purpose**: Performs a global search.
    - **Query Param**: `q` (or similar) - The search query string.
    - **Response**: Matches found across projects, tasks, and users.
