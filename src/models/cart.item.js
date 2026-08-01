import { sequelize } from "../config/dbConfig.js";
import { product } from "./product.js";
import { cart } from "./cart.js";
import { DataTypes } from "sequelize";

export const cartItem = sequelize.define("cart_item", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: "cart_items",
})

// Un Carrito tiene muchos Productos a través de cart_items
cart.belongsToMany(product, {
  through: cartItem,
  foreignKey: 'cart_id', // El id del carrito en la tabla intermedia
  otherKey: 'product_id' // El id del producto en la tabla intermedia
});

// Un Producto pertenece a muchos Carritos a través de cart_items
product.belongsToMany(cart, {
  through: cartItem,
  foreignKey: 'product_id',
  otherKey: 'cart_id'
});