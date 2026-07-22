import { cartItems } from '../models/cartItems.js';
import { product } from '../models/product.js';
import { user } from "../models/user.js";

export const getCartItemsByUserId = async (req, res) => {
  const { userId } = req.params;

  //viene del token
  const foundUser = await user.findByPk(userId);

  if (!foundUser)
    return res.status(404).json({ msg: 'Usuario no autenticado' });

  const response = await cartItems.findOne({
    where: {
      user_id: userId
    }
  });

  return res.status(200).json(response);
}

export const createCartOrAddItemToCart = async (req, res) => {
  const { userId } = req.params;

  const foundUser = await user.findByPk(userId);

  if (!foundUser)
    return res.status(404).json({ msg: 'Usuario no autenticado' });

  //validamos si el carrito existe
  const foundCartItems = await cartItems.findOne({
    where: {
      user_id: userId
    }
  });

  // si el carrito no existe
  if (!foundCartItems) {
    await cartItems.create({

    });
  }
}