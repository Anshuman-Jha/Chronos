# Lib Directory Documentation

## Overview
The `client/src/lib` directory is reserved for utility functions, shared helpers, and configuration modules that are used across multiple parts of the application. It helps keep the main component logic clean by abstracting away repetitive or complex logic.

## Role of Each Part

### `utils.ts`
- **Role**: General Utility Functions.
    - Likely matches the `cn` (classname) utility pattern common in modern React/Tailwind projects (using `clsx` and `tailwind-merge`).
    - **Purpose**: To conditionally and cleanly merge Tailwind CSS classes preventing class conflicts.
    - May also contain formatters (date, currency) or data transformation helpers used by multiple components.
