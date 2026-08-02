import express from "express";
const router = express.Router();

import { authenticateToken } from "../middlewares/authenticate.token.js";
import { authorizeRole } from "../middlewares/authorize.role.js";
import { addProductToCart, getUserCart, updateStatusCart } from "../controllers/cart.controller.js";


router.get("/:userId/my-cart", authenticateToken, authorizeRole(["user"]), getUserCart);
router.post("/:userId/cart-items/add-product", authenticateToken, authorizeRole(["user"]), addProductToCart);
router.patch("/:userId/status", authenticateToken, authorizeRole(["user"]), updateStatusCart);

export default router;