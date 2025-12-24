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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.getUser = exports.getUsers = void 0;
const client_1 = require("../prisma/client");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield client_1.prisma.user.findMany({
            select: {
                userId: true,
                email: true,
                username: true,
                profilePictureUrl: true,
                teamId: true,
            },
        });
        res.json(users);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield client_1.prisma.user.findUnique({
            where: {
                userId: parseInt(userId),
            },
            select: {
                userId: true,
                email: true,
                username: true,
                profilePictureUrl: true,
                teamId: true,
            },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving user: ${error.message}` });
    }
});
exports.getUser = getUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const user = yield client_1.prisma.user.findUnique({
            where: {
                userId: userId,
            },
            select: {
                userId: true,
                email: true,
                username: true,
                profilePictureUrl: true,
                teamId: true,
            },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving user: ${error.message}` });
    }
});
exports.getCurrentUser = getCurrentUser;
