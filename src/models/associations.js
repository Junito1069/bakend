import { order } from "./order.js";
import { sale } from "./sale.js";

order.hasOne(sale, { foreignKey: "order_id" });
sale.belongsTo(order, { foreignKey: "order_id" });