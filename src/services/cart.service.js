import { sequelize } from "../config/dbConfig.js";
import { AppError } from "../middlewares/app.error.js";
import { cart } from "../models/cart.js";
import { product } from "../models/product.js";
import { user } from "../models/user.js";

class cartService {
  async createUserCart(userId) {
    const foundCart = await cart.findOne({
      where: {
        user_id: userId
      }
    });

    if (foundCart)
      throw new AppError("El usuario ya tiene un carrito activo.", 409);

    //el carrito solo se va a crear al momento de agregar un objeto
    //so, este servicio no tendra controlador asignado
    //crear carrito
    await cart.create({
      user_id: userId
    });

  }

  async deleteCart(userId) {
    const foundCart = await cart.findOne({
      where: {
        user_id: userId
      }
    });

    if (!foundCart)
      throw new AppError("El usuario no tiene un carrito activo.", 404);

    await foundCart.destroy();

    return { msg: "Carrito eliminado exitosamente." };
  }

  async getCartByUserId(userId) {
    const foundCart = await cart.findOne({
      where: { user_id: userId },
      attributes: [
        "id",
        [sequelize.col('user.name'), 'comprador'],
        [sequelize.col("cart.createdAt"), 'fechaDeCreacion'],
      ],
      include: [
        {
          model: user,
          attributes: []
        },
        {
          model: product,
          attributes: [
            [sequelize.col("id"), 'productId'],
            [sequelize.col("name"), 'nombre'],
            [sequelize.col("price"), 'precio'],
            [sequelize.col("image"), "imagen"]
          ],
          through: {
            attributes: [
              ["quantity", "cantidadDeProductos"]
            ]
          }
        }
      ]
    });

    const { subtotal, totalWithTaxes } = await this.getTotalPriceToPayFromMyCart(foundCart);

    return {
      msg: "Carrito obtenido exitosamente.",
      cart: foundCart,
      subtotal,
      totalWithTaxes
    };
  }

  async updateStatusCart(userId) {
    const foundUser = await user.findByPk(userId);
    if (!foundUser)
      throw new AppError("El usuario no existe.", 404);

    const foundCart = await cart.findOne({
      where: {
        user_id: userId
      }
    });

    if (!foundCart)
      throw new AppError("El usuario no tiene un carrito activo.", 404);

    foundCart.status = "paid";
    await foundCart.save();
    //luego de actualizarse aqui, se registrara en pedido
    //luego se eliminara el carrito
    return { msg: "Carrito actualizado exitosamente." };
  }


  async getTotalPriceToPayFromMyCart(cart) {
    let subtotal = 0;

    cart.products.forEach(product => {
      //datavalues -> es entrar al objeto creado por sequelize
      const unitPrice = parseFloat(product.dataValues.precio);
      const quantity = parseInt(product.dataValues.cart_item.dataValues.cantidadDeProductos);

      subtotal += unitPrice * quantity;
    });

    const taxRate = 0.18; // 18% ITBIS
    const totalWithTaxes = subtotal + (subtotal * taxRate);

    return {
      subtotal,
      totalWithTaxes
    };
  }
}

export default new cartService();