# Components Directory Documentation

## Overview
This directory (`client/src/components`) houses the reusable UI building blocks of the Chronos application. These components are designed to be modular and decoupled from specific page logic where possible, ensuring consistency across the application.

## Role of Each Component

### `Header`
- **Role**: Acts as a page-level title and utility area. It provides context to the user about which section of the app they are currently viewing.

### `Navbar`
- **Role**: The primary top navigation bar. It handles global actions like search, theme toggling (dark/light mode), and settings access. It remains consistent across most pages to provide a stable navigational anchor.

### `Sidebar`
- **Role**: The main vertical navigation menu. It allows users to switch between major feature areas (Dashboard, Timeline, Settings) and specific projects. It lists teams and projects dynamically, serving as the central hub for accessing workspace content.

### `Modal` & `ModalNewTask`
- **Role**: These handle overlay interactions.
    - **`Modal`**: A generic wrapper for displaying content above the main page view, used for focused tasks that don't require leaving the current context.
    - **`ModalNewTask`**: A specialized form specifically for creating new tasks. It encapsulates the complex form logic for task creation, isolating it from the board or list views.

### `ProjectCard`
- **Role**: A presentational component that summarizes a project's key details (name, description, status) in a concise card format. Used in lists or grids to browse projects.

### `TaskCard`
- **Role**: Represents a single unit of work. It displays task details (title, assignee, priority, status) and is likely used within kanban boards or task lists. It serves as the primary interactive element for viewing task status at a glance.

### `UserCard`
- **Role**: A small, reusable component to display user information (avatar, name, email). Used in assignment dropdowns, team member lists, or headers to identify users throughout the app.
