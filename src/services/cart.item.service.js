import { cart } from "../models/cart.js";
import { product } from "../models/product.js";
import { cartItem } from "../models/cart.item.js";
import { AppError } from "../middlewares/app.error.js";
import cartService from "./cart.service.js";

class CartItemService {
  //para que este metodo funcione, tiene que haber un carrito
  async addProductToCart(userId, productId, quantity) {
    //buscamos el carrito
    const foundCart = await cart.findOne({
      where: {
        user_id: userId
      }
    })

    if (!foundCart) {
      await cartService.createUserCart(userId);
    }

    //si el carrito ya fue creado, hay que buscar el producto que tiene dentro
    const foundProduct = await product.findByPk(productId);
    if (!foundProduct)
      throw new AppError("El producto no existe.", 404);

    const productInCart = await cartItem.findOne({
      where: {
        product_id: productId,
        cart_id: foundCart.id
      }
    });

    //si el producto NO se encuentra en el carrito, quiere decir que es un producto nuevo
    //lo agregamos
    if (!productInCart) {

      if (quantity > foundProduct.stock)
        throw new AppError("La cantidad excede el stock disponible.", 400);

      if (quantity <= 0)
        throw new AppError("La cantidad debe ser mayor a 0.", 400);

      await cartItem.create({
        cart_id: foundCart.id,
        product_id: productId,
        quantity,
      })

      return { msg: "Producto agregado al carrito exitosamente." };
    } else {
      //si el producto ya se encuentra en el carrito, quiere decir que debemos actualizar la cantidad

      if (quantity + productInCart.quantity > foundProduct.stock)
        throw new AppError("La cantidad excede el stock disponible.", 400);

      if (quantity <= 0)
        throw new AppError("La cantidad debe ser mayor a 0.", 400);

      productInCart.quantity += quantity;
      foundProduct.stock -= quantity;
      await productInCart.save();
      await foundProduct.save();
      return { msg: "Cantidad actualizada exitosamente." };
    }
  }

  async deleteProductFromCart(userId, productId) {
    //ubicamos el carrito
    const foundCart = await cart.findOne({
      where: {
        user_id: userId
      }
    });

    if (!foundCart)
      throw new AppError("El carrito no existe.", 404);

    //ubicamos el producto en el carrito
    const productInCart = await cartItem.findOne({
      where: {
        product_id: productId,
        cart_id: foundCart.id
      }
    });

    if (!productInCart)
      throw new AppError("El producto no existe en el carrito.", 404);

    const foundProduct = await product.findByPk(productId);
    if (!foundProduct)
      throw new AppError("El producto no existe.", 404);

    //actualizamos el stock del producto
    foundProduct.stock += productInCart.quantity;
    await foundProduct.save();
    //eliminamos el producto del carrito
    await productInCart.destroy();

    return { msg: "Producto eliminado del carrito exitosamente." };
  }
}

export default new CartItemService();