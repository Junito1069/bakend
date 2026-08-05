import express from "express";
import {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  deleteOrder,
  updateOrderStatus
} from '../controllers/order.controller.js';

import { authenticateToken } from '../middlewares/authenticate.token.js';
import { authorizeRole } from '../middlewares/authorize.role.js';

const router = express.Router();

//user
router.post("/", authenticateToken, createOrder);
router.get("/:id", authenticateToken, getOrderById);
router.get("/user/:userId", authenticateToken, getOrdersByUser);
//admin
router.get("/", authenticateToken, authorizeRole(["admin"]), getAllOrders);
router.put("/:id/status", authenticateToken, authorizeRole(["admin"]), updateOrderStatus);
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), deleteOrder);

export default router;
