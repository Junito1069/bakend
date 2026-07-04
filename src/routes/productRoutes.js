import express from 'express';
const router = express.Router();
import {
  getAllProducts, getFeaturedProducts, getProductById, createProduct, updateProduct, deleteProduct
} from '../controllers/productController.js';


router.get('/get-all', getAllProducts);
router.get('/get/:id', getProductById);
router.get('/get-featured', getFeaturedProducts);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);


export default router;