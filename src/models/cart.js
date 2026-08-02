import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";
import { user } from "./user.js";

export const cart = sequelize.define("cart", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM("active", "paid"),
    defaultValue: "active"
  }
}, {
  tableName: "carts"
});


// 1. Un Usuario tiene un (1) Carrito
user.hasOne(cart, {
  foreignKey: 'user_id',
});

// 2. Un Carrito pertenece a un (1) Usuario
cart.belongsTo(user, {
  foreignKey: 'user_id',
});