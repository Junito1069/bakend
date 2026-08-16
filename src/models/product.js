import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';
import { category } from './category.js';

export const product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  sale_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  current_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  min_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'products',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

category.hasMany(product, { foreignKey: 'category_id' });
product.belongsTo(category, { foreignKey: 'category_id' });