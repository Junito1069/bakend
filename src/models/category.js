import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

export const category = sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: "categories"
});