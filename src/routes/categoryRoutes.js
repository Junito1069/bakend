import express from 'express';
const router = express.Router();
import { getAllCategories, getAllProductsByCategoryId, getCategoryById,
  addCategory, updateCategory, deleteCategory
} from '../controllers/categoryController.js'

router.get("/get-all", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.get("/products/:categoryId", getAllProductsByCategoryId);
router.post("/add", addCategory);
router.put("/update/:categoryId", updateCategory);
router.delete("/delete/:categoryId", deleteCategory);

export default router;