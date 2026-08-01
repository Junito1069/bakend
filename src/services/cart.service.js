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
      where: {
        user_id: userId
      },
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
            [sequelize.col("name"), 'nombre'],
            [sequelize.col("price"), 'precio']
          ],
          through: {
            attributes: [
              ["quantity", "cantidadDeProductos"]
            ]
          }
        }
      ]
    });

    return { msg: "Carrito obtenido exitosamente.", cart: foundCart };
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
}

export default new cartService();