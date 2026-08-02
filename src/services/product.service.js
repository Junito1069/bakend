import { product } from "../models/product.js";
import { category } from "../models/category.js";
import { AppError } from "../middlewares/app.error.js";

class ProductService {
  async getAllProducts() {
    const products = await product.findAll();
    return products;
  }

  async getProductById(productId) {
    const foundProduct = await product.findOne({
      where: {
        id: productId
      }
    })

    if (!foundProduct)
      throw new AppError('El producto no ha sido encontrado.', 404);

    return foundProduct;
  }

  async getFeaturedProducts() {
    const featuredProducts = await product.findAll({
      where: {
        featured: true
      }
    });

    if (!featuredProducts)
      throw new AppError('Los productos destacados no se han encontrado.', 404);

    return featuredProducts;
  }

  async createProduct(name, categoryId, price, salePrice, image, description, featured, stock, isActive, currentStock, minStock) {
    const foundProduct = await product.findOne({
      where: {
        name
      }
    })

    if (foundProduct)
      throw new AppError('El producto ya existe.', 409);

    const foundCategory = await category.findByPk(categoryId);

    if (!foundCategory)
      throw new AppError('La categoría no ha sido encontrada.', 404);

    if (stock <= 0) throw new AppError('El stock debe ser mayor o igual a 0.', 400);

    if (currentStock <= 0) throw new AppError('El stock actual debe ser mayor o igual a 0.', 400);

    if (minStock <= 0) throw new AppError('El stock mínimo debe ser mayor o igual a 0.', 400);

    await product.create({
      name,
      category_id: categoryId,
      price,
      sale_price: salePrice,
      image,
      description,
      featured,
      stock,
      is_active: isActive,
      current_stock: currentStock,
      min_stock: minStock
    });

    return { msg: 'Producto creado correctamente.' };
  }

  async updateProduct(id, name, categoryId, price, salePrice, image, description, featured, stock, currentStock, minStock) {
    const foundProduct = await product.findOne({
      where: {
        id
      }
    })

    if (!foundProduct)
      throw new AppError('El producto no ha sido encontrado.', 404);

    const foundCategory = await category.findByPk(categoryId);

    if (!foundCategory)
      throw new AppError('La categoría no ha sido encontrada.', 404);

    if (stock <= 0) throw new AppError('El stock debe ser mayor o igual a 0.', 400);

    if (currentStock <= 0) throw new AppError('El stock actual debe ser mayor o igual a 0.', 400);

    if (minStock <= 0) throw new AppError('El stock mínimo debe ser mayor o igual a 0.', 400);

    foundProduct.name = name;
    foundProduct.category_id = categoryId;
    foundProduct.price = price;
    foundProduct.sale_price = salePrice;
    foundProduct.image = image;
    foundProduct.description = description;
    foundProduct.featured = featured;
    foundProduct.stock = stock;
    foundProduct.current_stock = currentStock;
    foundProduct.min_stock = minStock;

    await foundProduct.save();

    return { msg: 'Producto actualizado correctamente.' };
  }

  async disableProduct(id) {
    const foundProduct = await product.findOne({
      where: {
        id
      }
    })

    if (!foundProduct)
      throw new AppError('El producto no ha sido encontrado.', 404);

    if (foundProduct.is_active == false)
      throw new AppError('El producto actualmente se ecuentra desahibilitado.', 409);

    await foundProduct.update({
      is_active: false
    });

    return { msg: 'Producto eliminado correctamente.' };
  }

  async enableProduct(id) {
    const foundProduct = await product.findOne({
      where: {
        id
      }
    })

    if (!foundProduct)
      throw new AppError('El producto no ha sido encontrado.', 404);

    if (foundProduct.is_active == true)
      throw new AppError('El producto actualmente se ecuentra habilitado.', 409);

    await foundProduct.update({
      is_active: true
    });

    return { msg: 'Producto habilitado correctamente.' };
  }
}

export default new ProductService();