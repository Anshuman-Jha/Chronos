# Public Directory Documentation

## Overview
The `client/public` directory stores static assets that are served directly by the web server. These files are accessible via the root URL (e.g., `/img.jpg`) and are not bundled by the build process in the same way as source code.

## Role of Each Part

### Images (`.jpg`, `.jpeg`)
- **Role**: Static image assets used for UI elements, dummy data, or branding.
    - **`p*.jpeg`**: Likely "Project" thumbnails or placeholders used in project cards.
    - **`i*.jpg`**: Likely "Item" or "User" avatars intended for demonstration purposes or default profiles.

### Icons (`.svg`)
- **Role**: Scalable Vector Graphics for crisp UI elements.
    - **`next.svg` / `vercel.svg`**: Default branding icons from the framework, likely used in the footer or initial loading states.

### `next.svg` & `vercel.svg`
- **Role**: Default logos provided by the Next.js framework, often used as placeholders or in the default landing page.
