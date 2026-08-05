import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

export const sale = sequelize.define("sale", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'sales',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
