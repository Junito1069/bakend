import { sequelize } from "../config/dbConfig";
import { DataTypes } from "sequelize";

export const order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    //se supone que para registrarse una orden, debe haberse pagado el carrito
    type: DataTypes.ENUM("shipped", "delivered", "cancelled"),
    allowNull: false,
    defaultValue: "shipped"
  }
}, {
  tableName: 'orders',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})