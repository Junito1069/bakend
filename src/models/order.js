import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";
import { orderItem } from "./order.item.js";
import { product } from "./product.js";
import { user } from "./user.js";

export const order = sequelize.define("order", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pendiente"
  },
  delivery_method: {
    type: DataTypes.STRING
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: "orders",
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

order.belongsTo(user, { foreignKey: "user_id" });
user.hasMany(order, { foreignKey: "user_id" });

order.hasMany(orderItem, { foreignKey: "order_id" });
orderItem.belongsTo(order, { foreignKey: "order_id" });

product.hasMany(orderItem, { foreignKey: "product_id" });
orderItem.belongsTo(product, { foreignKey: "product_id" });