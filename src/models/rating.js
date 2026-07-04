import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import { user } from "./user.js";
import { product } from "./product.js";

export const rating = sequelize.define("ratings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //quien hace la valoracion
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //a que producto se le hace la valoracion
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //puntuacion del 1 al 5
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comments: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: "ratings",
  timestamps: false
});



user.hasMany(rating, { foreignKey: 'user_id' });
rating.belongsTo(user, { foreignKey: 'user_id' });
