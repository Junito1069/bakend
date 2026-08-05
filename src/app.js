import express from 'express';
import cors from 'cors';
import { sequelize } from './config/dbConfig.js';


process.loadEnvFile();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

//import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import shipmentRoutes from './routes/shipment.routes.js';



//import models
import { user } from './models/user.js'
import { product } from './models/product.js'
import { category } from './models/category.js';
import { cart } from './models/cart.js';
import { cartItem } from './models/cart.item.js';
import { order } from './models/order.js';
import { sale } from './models/sale.js';
import { shipment } from './models/shipment.js';
import './models/associations.js';


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipments', shipmentRoutes);


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