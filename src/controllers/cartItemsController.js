import { cartItems } from '../models/cartItems.js';
import { product } from '../models/product.js';
import { user } from "../models/user.js";

export const getCartItemsByUserId = async (req, res) => {
  const { userId } = req.params;
  const foundUser = await user.findByPk(userId);

  //en el futuro, poner la validacion de auth
  //los metodos funcionen por token
  //la logica aqui es que si no encuentra el userId es porque no existe un token valido
  if (!foundUser)
    return res.status(401).json({ msg: 'Usuario no autenticado.' });


  const foundCartItems = await cartItems.findOne({
    where: {
      user_id: userId
    }
  });

  if (!foundCartItems)
    return res.status(404).json({ msg: 'No se han encontrado productos.' });

  const foundProduct = await product.findByPk(foundCartItems.product_id);

  //devolvemos con el nombre del producto, y el nombre del comprador
  const resultFormated = {
    id: foundCartItems.id,
    productName: foundProduct.name,
    quantity: foundCartItems.quantity,
    subtotal: foundCartItems.subtotal,
    username: foundUser.name
  }
  return res.status(200).json(resultFormated);
}

export const addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const foundUser = await user.findByPk(userId);

  if (!foundUser)
    return res.status(401).json({ msg: 'Usuario no autenticado.' });

  const foundCart = await cartItems.findOne({
    where: {
      user_id: userId
    }
  })

  const foundProduct = await product.findByPk(productId);
  if (!foundProduct)
    return res.status(404).json({ msg: 'Producto no encontrado.' });

  const subtotal = foundProduct.price * quantity;
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;


  //si no hay stock suficiente, el endpoint deberia explotar
  if (foundProduct.stock < quantity)
    return res.status(400).json({ msg: 'No hay suficientes unidades disponibles.' });


  //el carrito no existe
  if (!foundCart) {
    await cartItems.create({
      user_id: userId,
      product_id: productId,
      quantity,
      subtotal,
      taxes,
      total
    });
    return res.status(201).json({ msg: 'Primer producto agregado al carrito.' });
  }

  //el carrito ya existe pero se va a agregar el mismo producto
  if (foundCart.product_id == foundProduct.id) {
    foundCart.quantity += quantity;
    foundCart.subtotal = foundProduct.price * foundCart.quantity;
    foundCart.taxes = foundCart.subtotal * 0.18;
    foundCart.total = foundCart.subtotal + foundCart.taxes;
    await foundCart.save();
    return res.status(200).json({ msg: 'Producto actualizado en el carrito.' });
  }

  //el carrito ya existe pero se va a agregar un producto diferente
  await cartItems.create({
    user_id: userId,
    product_id: productId,
    quantity,
    subtotal,
    taxes,
    total
  });

  return res.status(201).json({ msg: 'Producto agregado al carrito.' });
}


export const getTotalCountItemsByUserId = async (req, res) => {
  const { userId } = req.params;

  const foundUser = await user.findByPk(userId);

  //si ejecuto este endpoint es que el usuario esta autenticado, pero para pruebas de backend, ponemos esta validacion
  if (!foundUser)
    return res.status(401).json({ msg: 'Usuario no autenticado.' });

  const countItems = await cartItems.count({
    where: {
      user_id: userId
    }
  });
  //devuelve el total de productos que tengo en el carrito con mi mismo id
  return res.status(200).json({ countItems });
}

export const deleteItemFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  const foundCartItem = await cartItems.findOne({
    where: {
      user_id: userId,
      product_id: productId
    }
  });

  if (!foundCartItem)
    return res.status(404).json({ msg: 'Item no encontrado en el carrito.' });

  await foundCartItem.destroy();
  return res.status(200).json({ msg: 'Item eliminado del carrito.' });

}

export const updateItemFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  const foundCartItem = await cartItems.findOne({
    where: {
      user_id: userId,
      product_id: productId
    }
  });

  if (!foundCartItem)
    return res.status(404).json({ msg: 'Item no encontrado en el carrito.' });

  const foundProduct = await product.findByPk(productId);
  if (!foundProduct)
    return res.status(404).json({ msg: 'Producto no encontrado.' });

  const subtotal = foundProduct.price * quantity;
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  foundCartItem.quantity = quantity;
  foundCartItem.subtotal = subtotal;
  foundCartItem.taxes = taxes;
  foundCartItem.total = total;

  await foundCartItem.save();
  return res.status(200).json({ msg: 'Item actualizado en el carrito.' });

}

export const deleteAllCart = async (req, res) => {
  const { userId } = req.body;

  const foundCart = await cartItems.findAll({
    where: {
      user_id: userId
    }
  });

  if (!foundCart)
    return res.status(404).json({ msg: 'Carrito no encontrado.' });

  await foundCart.destroy();
  return res.status(200).json({ msg: 'Carrito eliminado.' });
}
