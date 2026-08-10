import { user } from "../models/user.js";
import { product } from "../models/product.js";
import { order } from "../models/order.js";
import { AppError } from "../middlewares/app.error.js";
import { category } from "../models/category.js";

class AdminStats {
  async getTotals() {
    try {
      const totalUsers = await user.count();
      const totalProducts = await product.count();
      const totalOrders = await order.count();
      const totalCategories = await category.count();

      return {
        totalUsers,
        totalProducts,
        totalOrders,
        totalCategories,
      };
    } catch (error) {
      throw new AppError(error.message, error.statusCode || 500);
    }
  }

}

export default new AdminStats();