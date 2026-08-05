import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import { user } from "./user.js";
import { cart } from "./cart.js";

export const order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "paid", "cancelled"),
    defaultValue: "pending",
  }
}, {
  tableName: 'orders',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

order.belongsTo(user, { foreignKey: "user_id" });
order.belongsTo(cart, { foreignKey: "cart_id" });