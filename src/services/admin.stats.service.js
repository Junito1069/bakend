import { user } from "../models/user.js";
import { product } from "../models/product.js";
import { order } from "../models/order.js";
import { category } from "../models/category.js";
import { orderItem } from "../models/order.item.js";
import { sequelize } from "../config/dbConfig.js";

class AdminStatsService {
  async getDashboardStats() {
    const totalUsers = await user.count();
    const totalProducts = await product.count();
    const totalOrders = await order.count();
    const totalCategories = await category.count();
    const totalPendingSales = await order.count({
      where: {
        status: "Pendiente"
      }
    });
    const totalShippedSales = await order.count({
      where: {
        status: "Enviado"
      }
    });
    const totalCanceledSales = await order.count({
      where: {
        status: "Cancelado"
      }
    });
    const totalCompletedSales = await order.count({
      where: {
        status: "Completado"
      }
    });

    const graphicCircleData = [
      {
        name: "Pendiente",
        value: totalPendingSales,
        color: "#FF6B6B",
      },
      {
        name: "Enviado",
        value: totalShippedSales,
        color: "#4ECDC4",
      },
      {
        name: "Cancelado",
        value: totalCanceledSales,
        color: "#FFD93D",
      },
      {
        name: "Completado",
        value: totalCompletedSales,
        color: "#6B9080",
      },
    ];

    //por el momento esta servira tambien para las unidades vendidas
    const averageSales = totalCompletedSales / totalOrders;

    const salesByCategory = await orderItem.findAll({
      attributes: [
        [sequelize.col("product.category.id"), "categoryId"],
        [sequelize.col("product.category.name"), "categoryName"],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("`orderItem`.`quantity` * `orderItem`.`price`")
          ),
          "totalSales"
        ]
      ],
      include: [
        {
          model: product,
          attributes: [],
          include: [{ model: category, attributes: [] }]
        }
      ],
      group: ["product.category.id", "product.category.name"]
    });


    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalCategories,
      totalPendingSales,
      totalShippedSales,
      totalCanceledSales,
      totalCompletedSales,
      graphicCircleData,
      averageSales,
      salesByCategory,
    };
  }
}
export default new AdminStatsService();