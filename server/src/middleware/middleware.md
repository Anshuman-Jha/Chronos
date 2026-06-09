# Middleware Directory Documentation

## Overview
The `server/src/middleware` directory contains functions that intercept and process HTTP requests before they reach the main controller logic.

## Role of Each Part

### `authMiddleware.ts`
- **Role**: Security & Authentication Gatekeeper.
    - **Function**: `authenticateToken`
    - **Purpose**: Verifies the JWT (JSON Web Token) sent in the request headers.
    - **Logic**:
        - Checks if the `Authorization` header exists and contains a valid Bearer token.
        - Decodes the token to ensure it was signed by the server.
        - Attaches the decoded user information (`userId`, `userEmail`) to the request object so subsequent controllers know *who* is making the request.
        - **Blocker**: If the token is missing or invalid, it immediately rejects the request with a 401/403 error, preventing unauthorized access to protected routes.
