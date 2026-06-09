# Controllers Directory Documentation

## Overview
The `server/src/controllers` directory houses the business logic of the application. Each file typically corresponds to a specific domain resource (e.g., Projects, Tasks, Users) and contains functions that handle specific actions for that resource.

## Role of Each Part

### `authController.ts`
- **Role**: Authentication Logic.
    - Handles user registration (creating new accounts) and login (verifying credentials and issuing JWTs).

### `projectController.ts`
- **Role**: Project Management Logic.
    - Manages the lifecycle of projects: creating new projects, retrieving lists of projects, and fetching project details.

### `taskController.ts`
- **Role**: Task Management Logic.
    - The core of the productivity features. Handles creating tasks, updating their status (e.g., moving from "To Do" to "Done"), and retrieving tasks for specific views (like a user's task list).

### `userController.ts`
- **Role**: User Profile Logic.
    - Retrieves user information, which is essential for displaying profiles, assignees, and team members.

### `teamController.ts`
- **Role**: Team Management Logic.
    - Handles retrieval of team data, likely used to display team rosters and associated projects.

### `searchController.ts`
- **Role**: Global Search Logic.
    - Performs queries across multiple resources (tasks, projects, users) to return unified search results.
