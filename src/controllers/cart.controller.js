import cartItemService from '../services/cart.item.service.js';
import cartService from '../services/cart.service.js';

export const addProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const response = await cartItemService.addProductToCart(userId, productId, quantity);
    return res.status(201).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await cartService.getCartByUserId(userId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const updateStatusCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await cartService.updateStatusCart(userId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}

export const deleteProductFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const response = await cartItemService.deleteProductFromCart(userId, productId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ msg: error.message });
  }
}