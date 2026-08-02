import { category } from "../models/category.js";
import { product } from "../models/product.js";
import { AppError } from "../middlewares/app.error.js";

class CategoryService {
  async getAllCategories() {
    const response = await category.findAll();
    return response;
  }

  async getCategoryById(categoryId) {
    const categori = await category.findByPk(categoryId);

    if (!categori)
      throw new AppError('Categoria no encontrada', 404);

    return categori;
  }

  async addCategory({ name, img }) {
    const existingCategory = await category.findOne({
      where: {
        name
      }
    });

    if (existingCategory)
      return new AppError('Esta categoria ya existe.', 409);

    if (name.length < 5)
      throw new AppError('El nombre de la categoria es muy corto.', 500);

    await category.create({
      name,
      img
    });

    return { msg: 'Categoria agregada exitosamente.' };
  }

  async updateCategory(categoryId, { name, img }) {
    const existingCategory = await category.findByPk(categoryId);

    if (!existingCategory)
      throw new AppError('Categoria no encontrada', 404);

    existingCategory.name = name;
    existingCategory.img = img;
    await existingCategory.save();

    return { msg: 'Categoria actualizada con exito.' };
  }

  async disableCategory(categoryId) {
    const existingCategory = await category.findByPk(categoryId);

    if (!existingCategory)
      throw new AppError('Categoria no encontrada', 404);

    if (existingCategory.is_active == false)
      throw new AppError('La categoria actualmente se ecuentra deshabilitada.', 409);

    await existingCategory.update({
      is_active: false
    });

    return { msg: 'Categoria deshabilitada con exito.' };
  }

  async enableCategory(categoryId) {
    const existingCategory = await category.findByPk(categoryId);

    if (!existingCategory)
      throw new AppError('Categoria no encontrada', 404);

    if (existingCategory.is_active == true)
      throw new AppError('La categoria actualmente se ecuentra habilitada.', 409);

    await existingCategory.update({
      is_active: true
    });

    return { msg: 'Categoria habilitada con exito.' };
  }

  async getAllProductsByCategoryId(categoryId) {
    const products = await product.findAll({
      where: {
        category_id: categoryId
      }
    });

    return products;
  }

  async getCountProductsByCategoryId(categoryId) {
    const count = await product.count({
      where: {
        category_id: categoryId
      },
      attributes: []
    });

    return count;
  }
}

export default new CategoryService();