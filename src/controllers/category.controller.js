import _categoryService from "../services/category.service.js";

export const getAllCategories = async (req, res) => {
  try {
    const response = await _categoryService.getAllCategories();
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const getAllCategoriesInventory = async (req, res) => {
  try {
    const response = await _categoryService.getAllCategoriesInventory();
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const response = await _categoryService.getCategoryById(categoryId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const getCountProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const response = await _categoryService.getCountProductsByCategoryId(categoryId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const addCategory = async (req, res) => {
  const { name, img } = req.body;
  try {
    const response = await _categoryService.addCategory({ name, img });
    return res.status(201).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, img } = req.body;
  try {
    const response = await _categoryService.updateCategory(categoryId, { name, img });
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const disableCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const response = await _categoryService.disableCategory(categoryId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const enableCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const response = await _categoryService.enableCategory(categoryId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const getAllProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const response = await _categoryService.getAllProductsByCategoryId(categoryId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}