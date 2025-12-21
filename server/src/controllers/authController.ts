import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const register = async (req: Request, res: Response): Promise<void> => {
  // #region agent log
  const fs = require('fs');
  const logPath = '/Users/anishajha/Documents/Chronos/.cursor/debug.log';
  const logEntry = JSON.stringify({ location: 'authController.ts:10', message: 'Register endpoint called', data: { hasBody: !!req.body, bodyKeys: req.body ? Object.keys(req.body) : [], username: req.body?.username, email: req.body?.email, hasPassword: !!req.body?.password }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'F' }) + '\n';
  fs.appendFileSync(logPath, logEntry);
  // #endregion
  try {
    const { username, email, password, profilePictureUrl, teamId } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Username, email, and password are required" });
      return;
    }
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "User with this email or username already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profilePictureUrl: profilePictureUrl || "i1.jpg",
        teamId: teamId || 1,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    // #region agent log
    const fs2 = require('fs');
    const logPath2 = '/Users/anishajha/Documents/Chronos/.cursor/debug.log';
    const logEntry2 = JSON.stringify({ location: 'authController.ts:55', message: 'Register success response', data: { userId: newUser.userId, hasToken: !!token }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'G' }) + '\n';
    fs2.appendFileSync(logPath2, logEntry2);
    // #endregion
    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error: any) {
    // #region agent log
    const fs3 = require('fs');
    const logPath3 = '/Users/anishajha/Documents/Chronos/.cursor/debug.log';
    const logEntry3 = JSON.stringify({ location: 'authController.ts:72', message: 'Register error', data: { errorMessage: error.message, errorName: error.name, errorCode: error.code, stack: error.stack?.substring(0, 300) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'H' }) + '\n';
    try { fs3.appendFileSync(logPath3, logEntry3); } catch (e) { }
    console.error('[DEBUG] Register error:', error.message, error.code);
    // #endregion
    // Check for database connection errors
    if (error.code === 'P1001' || error.message?.includes("Can't reach database") || error.message?.includes('DATABASE_URL')) {
      res.status(500).json({ message: 'Database connection failed. Please create a .env file with DATABASE_URL. See .env.example for reference.' });
      return;
    }
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  // #region agent log
  const fs4 = require('fs');
  const logPath4 = '/Users/anishajha/Documents/Chronos/.cursor/debug.log';
  const logEntry4 = JSON.stringify({ location: 'authController.ts:65', message: 'Login endpoint called', data: { hasBody: !!req.body, bodyKeys: req.body ? Object.keys(req.body) : [], email: req.body?.email, hasPassword: !!req.body?.password }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'F' }) + '\n';
  fs4.appendFileSync(logPath4, logEntry4);
  // #endregion
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // #region agent log
    const fs5 = require('fs');
    const logPath5 = '/Users/anishajha/Documents/Chronos/.cursor/debug.log';
    const logEntry5 = JSON.stringify({ location: 'authController.ts:102', message: 'Login success response', data: { userId: user.userId, hasToken: !!token }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'G' }) + '\n';
    fs5.appendFileSync(logPath5, logEntry5);
    // #endregion
    res.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error: any) {

    res.status(500).json({ message: `Error during login: ${error.message}` });
  }
};

