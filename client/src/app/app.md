# App Directory Documentation

## Overview
This directory (`client/src/app`) corresponds to the Next.js **App Router**. It defines the routing structure, layout hierarchy, and global state configuration for the application.

## Role of Each Part

### `layout.tsx`
- **Role**: The Root Layout. It wraps the entire application and is responsible for defining the basic HTML structure (`<html>`, `<body>`) and loading global fonts (e.g., Inter). It ensures that every page shares the same fundamental environment.

### `page.tsx`
- **Role**: The Home Page. It serves as the landing point for the root user. In this application, it often redirects to a dashboard or serves as a marketing landing page depending on the auth state.

### `authProvider.tsx`
- **Role**: authentication Context Provider. It manages the user's login session. It wraps the application to provide `user` data and `auth` methods (login, register, logout) to any component that needs them, protecting routes that require a logged-in user.

### `redux.tsx`
- **Role**: Redux Store Provider. It integrates Redux Toolkit into the Next.js app. It wraps the application to allow global state access (like sidebar collapse state, theme mode) across all client components.

### `dashboardWrapper.tsx`
- **Role**: The Main Dashboard Layout. This component composes the `Sidebar`, `Navbar`, and the main content area. It is responsible for the responsive structure of the authenticated workspace, handling sidebar toggling and theme application (dark/light mode).

### `globals.css`
- **Role**: Global Stylesheet. Contains Tailwind CSS directives and standard CSS resets. It defines the base look and feel that applies to the entire application.

### Feature Directories (`projects/`, `users/`, `teams/`, `settings/`)
- **Role**: Route Groups. Each directory represents a major feature section of the application.
    - **`projects/`**: likely contains `[id]` dynamic routes for viewing specific project details, boards, and timelines.
    - **`priority/`**: Views for filtering tasks by priority.
    - **`search/`**: Dedicated search results page.
    - **`timeline/`**: A global timeline view across projects.

### `favicon.ico`
- **Role**: The browser tab icon. Provides visual brand identity in the browser interface.
