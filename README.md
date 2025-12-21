

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

  ```
