import { Sequelize } from "sequelize";
// process.loadEnvFile();

export const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql'
});