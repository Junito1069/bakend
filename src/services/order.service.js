import { cart } from "../models/cart.js";
import { cartItem } from "../models/cart.item.js";
import { AppError } from "../middlewares/app.error.js";
import { order } from "../models/order.js";
import { user } from "../models/user.js";
import { sale } from "../models/sale.js";
import { shipment } from "../models/shipment.js";

class orderService {
  async createOrder(userId) {

    const foundCart = await cart.findOne({
      user_id: userId
    });

    if (!foundCart)
      throw new AppError("El usuario no tiene un carrito activo.", 404);

    const cartItems = await cartItem.findAll({
      where: {
        cart_id: foundCart.id
      }
    });

    if (!cartItems)
      throw new AppError("El carrito está vacío.", 404);

    let subtotal = 0;

    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const taxRate = 0.18;
    const totalWithTaxes = subtotal + subtotal * taxRate;

    const orderr = await order.create({
      userId,
      cartId: foundCart.id,
      subtotal,
      total,
      status: "pending"
    });

    return orderr;
  }

  async getOrderById(orderId) {
    const foundOrder = await order.findByPk(orderId, {
      include: [
        cart,
        user,
        sale,
        shipment
      ]
    });

    return foundOrder;
  }

  async getOrderByUser(userId) {
    return await order.findAll({
      where: {
        user_id: userId
      },
      include: [shipment]
    });
  }

  async getAllOrders() {
    return await order.findAll({
      include: [user, shipment]
    });
  }

  async deleteOrder(orderId) {
    const foundOrder = await order.findByPk(orderId);

    if (!foundOrder)
      throw new AppError("Pedido no encontrado.", 404);


    await foundOrder.destroy();
    return { msg: "Pedido eliminado correctamente." };
  }

  async attachShipment(orderId, shipmentData) {
    const foundOrder = await order.findByPk(orderId);

    if (!foundOrder)
      throw new AppError("Pedido no encontrado.", 404);

    const newShipment = await shipment.create({
      orderId,
      ...shipmentData
    });

    return newShipment;
  }


}

export default new orderService();