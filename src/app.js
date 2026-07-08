import express from 'express';
import cors from 'cors';
import { sequelize } from './config/dbConfig.js';


process.loadEnvFile();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

//import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartItemRoutes from './routes/cartItemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';



//import models
import { user } from './models/user.js'
import { rating } from './models/rating.js'
import { product } from './models/product.js'
import { cartItems } from './models/cartItems.js'
import { category } from './models/category.js';


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartItemRoutes);
app.use('/api/categories', categoryRoutes);


async function main() {
  try {
    await sequelize.sync({ force: false });

  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

app.listen(PORT, () => {
  console.log("El servidor está corriendo en el puerto", PORT);
})

await main();