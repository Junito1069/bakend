import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';
import { rating } from './rating.js';
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
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'products',
  timestamps: false
})

product.hasMany(rating, { foreignKey: 'product_id' });
rating.belongsTo(product, { foreignKey: 'product_id' });

product.hasMany(rating, { foreignKey: 'product_id' });
rating.belongsTo(product, { foreignKey: 'product_id' });

category.hasMany(product, { foreignKey: 'category_id' });
product.belongsTo(category, { foreignKey: 'category_id' });