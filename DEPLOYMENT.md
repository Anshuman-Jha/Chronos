# Deployment Guide

This guide will help you deploy the Chronos project management application to Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Render account (free tier available)
- PostgreSQL database (Render provides free PostgreSQL)

## Backend Deployment (Render)

### 1. Set up PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `chronos-db` (or your preferred name)
   - Database: `chronos`
   - User: `chronos_user` (or auto-generated)
   - Region: Choose closest to you
   - Plan: Free (or paid for production)
4. Click "Create Database"
5. Copy the **Internal Database URL** (you'll need this)

### 2. Deploy Backend to Render

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `chronos-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (or set to `server` if needed)

4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=<your-postgres-internal-url-from-step-1>
   JWT_SECRET=<generate-a-random-secret-key-here>
   ```
   
   To generate a JWT_SECRET, you can use:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. Click "Create Web Service"

### 3. Run Database Migrations

After the backend is deployed:

1. Go to your backend service on Render
2. Click "Shell" tab
3. Run:
   ```bash
   cd server
   npx prisma generate
   npx prisma migrate deploy
   npm run seed
   ```

### 4. Get Backend URL

After deployment, Render will provide a URL like:
`https://chronos-backend.onrender.com`

Copy this URL - you'll need it for the frontend.

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.next` (or leave default)

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://chronos-backend.onrender.com
   ```

6. Click "Deploy"

### 2. Update CORS on Backend

After frontend is deployed, update your backend CORS settings:

1. Go to Render backend service
2. Edit your `server/src/index.ts` to allow your Vercel domain:
   ```typescript
   app.use(cors({
     origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```
3. Redeploy the backend

## Local Development Setup

### Backend

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/chronos
   JWT_SECRET=your-local-secret-key
   PORT=3001
   ```

4. Set up database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run seed
   ```

5. Start server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Database Migration Notes

The schema has been updated to replace `cognitoId` with `email` and `password`. If you have existing data:

1. **Backup your database first!**
2. Create a migration to:
   - Add `email` and `password` columns
   - Migrate data if possible
   - Remove `cognitoId` column
3. Or start fresh with the new schema

## Environment Variables Summary

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (production/development)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL

## Troubleshooting

### Backend Issues

- **Database connection errors**: Check DATABASE_URL is correct
- **JWT errors**: Ensure JWT_SECRET is set and consistent
- **CORS errors**: Update CORS settings to include your frontend URL

### Frontend Issues

- **API calls failing**: Check NEXT_PUBLIC_API_BASE_URL is correct
- **Authentication not working**: Verify backend is running and accessible
- **Build errors**: Check Node.js version (should be 18+)

## Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong JWT_SECRET** - Generate a random 32+ character string
3. **Enable HTTPS** - Both Vercel and Render provide HTTPS by default
4. **Update CORS** - Only allow your frontend domain(s)
5. **Database security** - Use Render's internal database URL for better security

## Support

For issues or questions, check:
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

