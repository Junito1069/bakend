import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import { user } from "./user.js";
import { product } from "./product.js";

export const cartItems = sequelize.define("cartItems", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  taxes: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  isPayed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isDelivered: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: "cart_items",
  timestamps: false
});

// Un usuario puede tener muchos items en el carrito
user.hasMany(cartItems, { foreignKey: 'user_id' });
cartItems.belongsTo(user, { foreignKey: 'user_id' });

// Un producto puede estar en muchos carritos
product.hasMany(cartItems, { foreignKey: 'product_id' });
cartItems.belongsTo(product, { foreignKey: 'product_id' });