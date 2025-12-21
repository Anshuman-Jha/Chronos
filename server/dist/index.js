"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
/* ROUTE IMPORTS */
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./src/routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./src/routes/taskRoutes"));
const searchRoutes_1 = __importDefault(require("./src/routes/searchRoutes"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const teamRoutes_1 = __importDefault(require("./src/routes/teamRoutes"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
}));
/* ROUTES */
app.get("/", (req, res) => {
    res.send("This is home route");
});
app.use("/auth", authRoutes_1.default);
app.use("/projects", projectRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
app.use("/search", searchRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/teams", teamRoutes_1.default);
/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
    // #region agent log
    const fs = require('fs');
    const logPath = '/Users/anishajha/Documents/Chronos/.cursor/debug.log';
    const logEntry = JSON.stringify({ location: 'index.ts:45', message: 'Server started', data: { port, host: '0.0.0.0', envPort: process.env.PORT }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) + '\n';
    fs.appendFileSync(logPath, logEntry);
    // #endregion
});
