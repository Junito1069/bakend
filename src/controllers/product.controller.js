import _productService from "../services/product.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await _productService.getAllProducts();
    return res.status(200).json(allProducts);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const getAllProductsInventory = async (req, res) => {
  try {
    const products = await _productService.getAllProductsInventory();
    return res.status(200).json(products);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const getFeaturedProducts = async (req, res) => {
  try {
    const allFeaturedProducts = await _productService.getFeaturedProducts();
    return res.status(200).json(allFeaturedProducts);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundProduct = await _productService.getProductById(id);
    return res.status(200).json(foundProduct);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, categoryId, price, salePrice, image, description, featured, stock, isActive, currentStock, minStock } = req.body;
    const respose = await _productService.createProduct(name, categoryId, price, salePrice, image, description, featured, stock, isActive, currentStock, minStock);
    return res.status(200).json(respose);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }

}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId, price, salePrice, image, description, featured, stock, currentStock, minStock } = req.body;

  try {
    const response = await _productService.updateProduct(id, name, categoryId, price, salePrice, image, description, featured, stock, currentStock, minStock);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const disableProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await _productService.disableProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const enableProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await _productService.enableProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}