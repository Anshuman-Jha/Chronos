import { Router } from "express";
import { getUser, getUsers, getCurrentUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getUsers);
router.get("/me", authenticateToken, getCurrentUser);
router.get("/:userId", authenticateToken, getUser);


export default router;
