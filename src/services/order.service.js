import { cart } from "../models/cart.js";
import { cartItem } from "../models/cart.item.js";
import { AppError } from "../middlewares/app.error.js";
import { order } from "../models/order.js";
import { orderItem } from "../models/order.item.js";
import { product } from "../models/product.js";

class orderService {

  async createOrder(userId, deliveryMethod) {
    //ubicamos el carrito
    const foundCart = await cart.findOne({
      where: {
        user_id: userId
      }
    })

    if (!foundCart)
      throw new AppError("El usuario no tiene un carrito activo.", 404);

    //ubicamos los items del carrito
    const cartItems = await cartItem.findAll({
      where: {
        cart_id: foundCart.id
      },
      include: [
        {
          model: product,
          attributes: ['id', 'name', 'price']
        }
      ]
    });

    if (!cartItems)
      throw new AppError("El carrito está vacío.", 404);

    let subtotal = 0;
    cartItems.forEach((item) => {
      const unitPrice = parseFloat(item.product.price);
      const quantity = item.quantity;
      subtotal += unitPrice * quantity;
    });

    if (cartItems.length === 0)
      throw new AppError("El carrito esta vacio.", 400);

    const taxRate = 0.18;
    const total = subtotal + (subtotal * taxRate);
    console.log(subtotal, total);

    //se crea la orden

    const newOrder = await order.create({
      user_id: userId,
      subtotal,
      tax: subtotal * taxRate,
      total,
      status: "Pendiente",
      delivery_method: deliveryMethod,
      payment_method: "Tarjeta de Crédito",
    });


    //antes de agregarlo, valide si hay stock disponible
    for (const item of cartItems) {

      const foundProduct = await product.findByPk(item.product_id);

      if (!foundProduct)
        throw new AppError("Producto no encontrado.", 404);

      if (foundProduct.current_stock < item.quantity)
        throw new AppError("Producto sin stock.", 400);

      await orderItem.create({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: subtotal
      })

      //actualizar 
      await product.update({
        current_stock: foundProduct.current_stock - item.quantity
      }, {
        where: {
          id: item.product_id
        }
      });
    }

    await cartItem.destroy({
      where: {
        cart_id: foundCart.id
      }
    });

    return { msg: 'Orden creada exitosamente.' }
  }

  async getAllOrders() {
    const orders = await order.findAll();

    if (!orders)
      throw new AppError("No se encontraron ordenes.", 404);

    return { orders };
  }

  async getOrdersByUser(userId) {
    const orders = await order.findAll({
      where: {
        user_id: userId
      }, include: [
        {
          model: orderItem,
          include: [
            {
              model: product,
              attributes: ["id", "name", "price", "image"]
            }
          ]
        }
      ]
    })

    return { msg: "Orden obtenida exitosamente.", orders };
  }

  async getOrderById(orderId, userId) {
    const foundOrder = await order.findOne({
      where: {
        user_id: userId,
        id: orderId
      }, include: [
        {
          model: orderItem,
          include: [
            {
              model: product,
              attributes: ["id", "name", "price", "image"]
            }
          ]
        }
      ]
    })

    return { foundOrder };
  }

  async getOrderByIdAdmin(orderId) {
    const foundOrder = await order.findOne({
      where: {
        id: orderId
      }, include: [
        {
          model: orderItem,
          include: [
            {
              model: product,
              attributes: ["id", "name", "price", "image"]
            }
          ]
        }
      ]
    })

    return { foundOrder };
  }

  async updateStatusOrder(orderId, status) {
    const foundOrder = await order.findByPk(orderId);

    if (!foundOrder)
      throw new AppError("Orden no encontrada.", 404);

    if (foundOrder.status === status)
      throw new AppError("La orden ya tiene ese estado.", 400);

    switch (status) {
      case "Pagado":
        foundOrder.status = status;
        break;
      case "Enviado":
        foundOrder.status = status;
        break;
      case "Completado":
        foundOrder.status = status;
        break;
      case "Cancelado":
        foundOrder.status = status;
        break;
      default:
        throw new AppError("Estado de orden no valido.", 400);
    }

    await foundOrder.save();
    return { msg: "Orden actualizada exitosamente." };
  }
}

export default new orderService();