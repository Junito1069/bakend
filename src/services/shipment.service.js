import { shipment } from "../models/shipment.js";

class ShipmentService {
  async createShipment(orderId, data) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new AppError("Pedido no encontrado.", 404);

    const shipmentt = await shipment.create({
      orderId,
      estado: "pendiente",
      trackingNumber: data.trackingNumber || null,
      fechaEnvio: data.fechaEnvio || new Date(),
    });

    return shipmentt;
  }

  async getShipmentById(shipmentId) {
    return await shipment.findByPk(shipmentId, {
      include: [order]
    });
  }

  async getShipmentsByOrder(orderId) {
    return await shipment.findAll({
      where: { orderId }
    });
  }

  async getAllShipments() {
    return await shipment.findAll({
      include: [order]
    });
  }

  async updateShipmentStatus(shipmentId, newStatus) {
    const foundShipment = await shipment.findByPk(shipmentId);
    if (!foundShipment)
      throw new AppError("Envío no encontrado.", 404);

    foundShipment.estado = newStatus;

    if (newStatus === "entregado") {
      foundShipment.fechaEntrega = new Date();
    }

    if (newStatus === "cancelado") {
      foundShipment.fechaCancelacion = new Date();
    }

    await foundShipment.save();
    return foundShipment;
  }

  async updateTrackingInfo(shipmentId, trackingNumber, carrier) {
    const foundShipment = await shipment.findByPk(shipmentId);
    if (!foundShipment)
      throw new AppError("Envío no encontrado.", 404);

    foundShipment.trackingNumber = trackingNumber;

    await foundShipment.save();

    return foundShipment;
  }

  async deleteShipment(shipmentId) {
    const foundShipment = await shipment.findByPk(shipmentId);

    if (!foundShipment)
      throw new AppError("Envío no encontrado.", 404);

    await foundShipment.destroy();
    return { msg: "Envío eliminado correctamente." };
  }

}

export default new ShipmentService();