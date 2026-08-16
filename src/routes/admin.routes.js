import express from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
const router = express.Router();
import { authenticateToken } from "../middlewares/authenticate.token.js";
import { authorizeRole } from "../middlewares/authorize.role.js"

router.get("/dashboard-stats", authenticateToken, authorizeRole(["admin"]), getDashboardStats);

export default router;