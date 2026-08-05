import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import { order } from "./order.js";

export const shipment = sequelize.define("shipment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "en_transito", "entregado", "cancelado"),
    defaultValue: "pendiente",
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fechaEnvio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fechaEntrega: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'shipment',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

shipment.belongsTo(order, { foreignKey: "orderId" });