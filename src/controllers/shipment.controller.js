import _shipmentService from "../services/shipment.service.js";

export const createShipment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const shipment = await _shipmentService.createShipment(orderId, req.body);
    res.status(201).json({ msg: "Envío creado exitosamente", shipment });
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await _shipmentService.getShipmentById(id);
    res.json(shipment);
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const getShipmentsByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const shipments = await _shipmentService.getShipmentsByOrder(orderId);
    res.json(shipments);
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const getAllShipments = async (req, res) => {
  try {
    const shipments = await _shipmentService.getAllShipments();
    res.json(shipments);
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const shipment = await _shipmentService.updateShipmentStatus(id, estado);
    res.json({ msg: "Estado actualizado", shipment });
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const updateTrackingInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { trackingNumber, carrier } = req.body;
    const shipment = await _shipmentService.updateTrackingInfo(id, trackingNumber, carrier);
    res.json({ msg: "Tracking actualizado", shipment });
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await _shipmentService.deleteShipment(id);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};