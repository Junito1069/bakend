import { category } from "../models/category.js";
import { product } from "../models/product.js";

export const getAllCategories = async(req, res) => {
  const categories = await category.findAll();

  return res.status(200).json(categories);
}

export const getCategoryById = async (req, res) => {
  const {categoryId} = req.params;
  const categori = await category.findByPk(categoryId);

  if(!categori)
    return res.status(404).json({msg: 'Categoria no encontrada'});

  return res.status(200).json(categori);
}

export const addCategory = async (req, res) => {
  const {name, img} = req.body;

  const existingCategory = await category.findOne({
    where: {
      name
    }
  });

  if(existingCategory)
    return res.status(409).json({msg: 'Esta categoria ya existe.'});

  if(name.length < 5)
    return res.status(500).json({msg: 'El nombre de la categoria es muy corto.'});

  await category.create({
    name,
    img
  });

  return res.status(201).json({msg: 'Categoria agregada exitosamente.'});
}

export const updateCategory = async (req, res) => {
  const {categoryId} = req.params;
  const {name, img}= req.body;

  const existingCategory = await category.findByPk(categoryId);

  if(!existingCategory)
    return res.status(404).json({msg: 'Categoria no encontrada'});

  existingCategory.name = name;
  existingCategory.img = img;
  await existingCategory.save();

  return res.status(201).json({msg: 'Categoria actualizada con exito.'});
}

export const deleteCategory = async (req, res) => {
  const {categoryId} = req.params;

  const existingCategory = await category.findByPk(categoryId);

  if(!existingCategory)
    return res.status(404).json({msg: 'Categoria no encontrada'});

  await existingCategory.destroy();
}

export const getAllProductsByCategoryId = async(req, res) => {
  const {categoryId} = req.params;

  const products = await product.findAll({
    where: {
      category_id: categoryId
    }
  });

  return res.status(200).json(products);
}