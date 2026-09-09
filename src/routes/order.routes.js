import express from "express";
import {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  deleteOrder,
  updateStatusOrder,
  getOrderByIdAdmin,
} from '../controllers/order.controller.js';

import { authenticateToken } from '../middlewares/authenticate.token.js';
import { authorizeRole } from '../middlewares/authorize.role.js';

const router = express.Router();

//user
router.post("/create/:userId", authenticateToken, authorizeRole(["user"]), createOrder);
router.get("/:id/user/:userId", authenticateToken, authorizeRole(["user"]), getOrderById);
router.get("/user/:userId", authenticateToken, authorizeRole(["user"]), getOrdersByUser);
// //admin
router.get("/", authenticateToken, authorizeRole(["admin"]), getAllOrders);
router.patch("/:id/status", authenticateToken, authorizeRole(["admin", "user"]), updateStatusOrder);
router.get("/:id", authenticateToken, authorizeRole(["admin"]), getOrderByIdAdmin);
// router.delete("/:id", authenticateToken, authorizeRole(["admin"]), deleteOrder);


export default router;
