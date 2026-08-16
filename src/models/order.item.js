import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

export const orderItem = sequelize.define("orderItem", {
  order_id: {
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
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
}, {
  tableName: "orderItems",
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

