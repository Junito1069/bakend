import { product } from "../models/product.js";

export const getAllProducts = async (req, res) => {
  const allProducts = await product.findAll();

  return res.status(200).json(allProducts);
}

export const getFeaturedProducts = async (req, res) => {
  const featuredProducts = await product.findAll({
    where: {
      featured: true
    }
  });

  if (featuredProducts.length == 0)
    return res.status(404).json({ msg: 'No se han encontrado productos destacados.' });

  return res.status(200).json(featuredProducts);
}

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const foundProduct = await product.findOne({
    where: {
      id
    }
  })

  if (!foundProduct)
    return res.status(404).json({ msg: 'El producto no ha sido encontrado.' });

  return res.status(200).json(foundProduct);
}

export const createProduct = async (req, res) => {
  const { name, categoryId, price, salePrice, image, description, featured, stock } = req.body;

  const foundProduct = await product.findOne({
    where: {
      name
    }
  })

  if (foundProduct)
    return res.status(400).json({ msg: 'El producto ya existe.' });

  await product.create({
    name,
    category_id: categoryId,
    price,
    sale_price: salePrice,
    image,
    description,
    featured,
    stock
  });

  return res.status(201).json({ msg: 'Producto creado correctamente.' });
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, salePrice, rating, image, description, featured, stock } = req.body;

  const foundProduct = await product.findOne({
    where: {
      id
    }
  })

  if (!foundProduct)
    return res.status(404).json({ msg: 'El producto no ha sido encontrado.' });

  foundProduct.name = name;
  foundProduct.category = category;
  foundProduct.price = price;
  foundProduct.sale_price = salePrice;
  foundProduct.rating = rating;
  foundProduct.image = image;
  foundProduct.description = description;
  foundProduct.featured = featured;
  foundProduct.stock = stock;

  await foundProduct.save();

  return res.status(200).json({ msg: 'Producto actualizado correctamente.' });
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const foundProduct = await product.findOne({
    where: {
      id
    }
  })

  if (!foundProduct)
    return res.status(404).json({ msg: 'El producto no ha sido encontrado.' });

  await foundProduct.destroy();

  return res.status(200).json({ msg: 'Producto eliminado correctamente.' });
}