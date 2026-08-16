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


cart.belongsToMany(product, {
  through: cartItem,
  foreignKey: "cart_id",
  otherKey: "product_id"
});

product.belongsToMany(cart, {
  through: cartItem,
  foreignKey: "product_id",
  otherKey: "cart_id"
});

// Relaciones directas con la tabla intermedia
cart.hasMany(cartItem, { foreignKey: "cart_id" });
cartItem.belongsTo(cart, { foreignKey: "cart_id" });

product.hasMany(cartItem, { foreignKey: "product_id" });
cartItem.belongsTo(product, { foreignKey: "product_id" });