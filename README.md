# Build a Complete Project Management Dashboard

[![Tutorial Video](https://img.youtube.com/vi/KAV8vo7hGAo/0.jpg)](https://www.youtube.com/watch?v=KAV8vo7hGAo)

This repository hosts the code for a comprehensive Project Management Dashboard using Next.js, Node.js, and JWT authentication.
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel (frontend) and Render (backend).

## Join Our Community

For discussion and support for this specific app, join our [Discord community](https://discord.com/channels/1070200085440376872/1082900634442940416/threads/1282730219488280576).

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, Redux Toolkit, Redux Toolkit Query, Material UI Data Grid
- **Backend**: Node.js with Express, Prisma (PostgreSQL ORM), JWT Authentication
- **Database**: PostgreSQL
- **Deployment**: Vercel (Frontend), Render (Backend)
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing

## Getting Started

### Prerequisites

Ensure you have these tools installed:

- Git
- Node.js
- npm (Node Package Manager)
- PostgreSQL ([download](https://www.postgresql.org/download/))
- PgAdmin ([download](https://www.pgadmin.org/download/))

### Installation Steps

1. Clone the repository:
   `git clone [git url]`
   `cd project-management`

2. Install dependencies in both client and server:
   `cd client`
   `npm i`
   `cd ..`
   `cd server`
   `npm i`

3. Set up the database:
   `npx prisma generate`
   `npx prisma migrate dev --name init`
   `npm run seed`

4. Configure environment variables:

- **Server** (`.env` in `server/` directory):
  ```
  DATABASE_URL=postgresql://user:password@localhost:5432/chronos
  JWT_SECRET=your-secret-key-here
  PORT=3001
  ```

- **Client** (`.env.local` in `client/` directory):
  ```
  NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
  ```

5. Run the project:
   
   **Backend** (in `server/` directory):
   ```bash
   npm run dev
   ```
   
   **Frontend** (in `client/` directory, in a new terminal):
   ```bash
   npm run dev
   ```

6. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Additional Resources

### Code Repositories and Configuration Files

- [Complete project code on GitHub](https://github.com/ed-roh/project-management)
- [Tailwind CSS configuration](https://github.com/ed-roh/project-management/blob/master/client/tailwind.config.ts)
- [Redux Toolkit setup](https://github.com/ed-roh/project-management/blob/master/client/src/app/redux.tsx)
- [Database seed files](https://github.com/ed-roh/project-management/tree/master/server/prisma/seedData)
- [Image files](https://github.com/ed-roh/project-management/tree/master/client/public)
- [globals.css file (to copy for Gantt charts)](https://github.com/ed-roh/project-management/blob/master/client/src/app/globals.css)
- [Deployment Guide](./DEPLOYMENT.md) - Instructions for deploying to Vercel and Render

### Diagrams and Models

- [Data model diagram](https://lucid.app/lucidchart/877dec2c-db89-4f7b-9ce0-80ce88b6ee37/edit)
- [AWS architecture diagram](https://lucid.app/lucidchart/62c20695-d936-4ee7-9a53-ceef7aef8127/edit)
- [AWS Cognito flow diagram](https://lucid.app/lucidchart/9e17e28e-6fe5-41df-b04b-b378fa21eb8f/edit)

### Database Management Commands

- Command for resetting ID in database:
  ```sql
  SELECT setval(pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id'), coalesce(max(id)+1, 1), false) FROM "[DATA_MODEL_NAME_HERE]";
  ```
