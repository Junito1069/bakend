import express from 'express';
const router = express.Router();
import {
  getAllCategories, getAllProductsByCategoryId, getCategoryById,
  addCategory, updateCategory, disableCategory, enableCategory
} from '../controllers/category.controller.js'

import { authenticateToken } from '../middlewares/authenticate.token.js';
import { authorizeRole } from "../middlewares/authorize.role.js";

router.get("/get-all", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.get("/products/:categoryId", getAllProductsByCategoryId);
router.post("/create", authenticateToken, authorizeRole("admin"), addCategory);
router.put("/update/:categoryId", authenticateToken, authorizeRole("admin"), updateCategory);
router.patch("/disable/:categoryId", authenticateToken, authorizeRole("admin"), disableCategory);
router.patch("/enable/:categoryId", authenticateToken, authorizeRole("admin"), enableCategory);

export default router;