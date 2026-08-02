import { cart } from "../models/cart";

class orderService {
  async createOrder(userId) {
    //buscar carrito

    const foundCart = await cart.findOne({
      user_id: userId
    });

    if (!foundCart)
      throw new AppError("El usuario no tiene un carrito activo.", 404);

    //obtener todos los productos del carrito
    const cartItems = await cartItem.findAll({
      where: {
        cart_id: foundCart.id
      }
    });

    if (!cartItems)
      throw new AppError("El carrito está vacío.", 404);

    //calcular el total de la orden
    let total = 0;

  }
}

export default new orderService();