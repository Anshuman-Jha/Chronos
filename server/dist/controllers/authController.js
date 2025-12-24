"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("../prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, email, password, profilePictureUrl, teamId } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "Username, email, and password are required" });
            return;
        }
        // Check if user already exists
        const existingUser = yield client_1.prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            res.status(400).json({ message: "User with this email or username already exists" });
            return;
        }
        // Hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create user
        const newUser = yield client_1.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                profilePictureUrl: profilePictureUrl || "i1.jpg",
                teamId: teamId || null,
            },
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser.userId, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" });
        // Remove password from response
        const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        res.status(201).json({
            message: "User created successfully",
            user: userWithoutPassword,
            token,
        });
    }
    catch (error) {
        // #region agent log
        const fs3 = require('fs');
        const logPath3 = '/Users/anishajha/Documents/Chronos/.cursor/debug.log';
        const logEntry3 = JSON.stringify({ location: 'authController.ts:72', message: 'Register error', data: { errorMessage: error.message, errorName: error.name, errorCode: error.code, stack: (_a = error.stack) === null || _a === void 0 ? void 0 : _a.substring(0, 300) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'H' }) + '\n';
        try {
            fs3.appendFileSync(logPath3, logEntry3);
        }
        catch (e) { }
        console.error('[DEBUG] Register error:', error.message, error.code);
        console.error('Register error:', error.message, error.code);
        0;
        json({ message: `Error creating user: ${error.message}` });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // #region agent log
    const fs4 = require('fs');
    const logPath4 = '/Users/anishajha/Documents/Chronos/.cursor/debug.log';
    const logEntry4 = JSON.stringify({ location: 'authController.ts:65', message: 'Login endpoint called', data: { hasBody: !!req.body, bodyKeys: req.body ? Object.keys(req.body) : [], email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email, hasPassword: !!((_b = req.body) === null || _b === void 0 ? void 0 : _b.password) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'F' }) + '\n';
    fs4.appendFileSync(logPath4, logEntry4);
    // #endregion
});
exports.login = login;
// Find user by email
const user = await client_1.prisma.user.findUnique({
    where: { email },
});
if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
}
// Verify password
const isValidPassword = await bcrypt_1.default.compare(password, user.password);
if (!isValidPassword) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
}
// Generate JWT token
const token = jsonwebtoken_1.default.sign({ userId: user.userId, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
// Remove password from response
const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
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
try { }
catch (error) {
}
