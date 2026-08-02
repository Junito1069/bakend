import express from 'express';
const router = express.Router();
import {
  getAllProducts, getFeaturedProducts, getProductById, createProduct, updateProduct, disableProduct, enableProduct
} from '../controllers/product.controller.js';

import { authenticateToken } from "../middlewares/authenticate.token.js";
import { authorizeRole } from "../middlewares/authorize.role.js";


router.get('/get-all', getAllProducts);
router.get('/get/:id', getProductById);
router.get('/get-featured', getFeaturedProducts);
router.post('/create', authenticateToken, authorizeRole("admin"), createProduct);
router.put('/update/:id', authenticateToken, authorizeRole("admin"), updateProduct);
router.patch('/disable/:id', authenticateToken, authorizeRole("admin"), disableProduct);
router.patch('/enable/:id', authenticateToken, authorizeRole("admin"), enableProduct);


export default router;