import _orderService from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const order = await _orderService.createOrder(userId);
    res.status(201).json({ msg: "Pedido creado exitosamente", order });
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await _orderService.getOrderById(id);
    res.json(order);
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await _orderService.getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await _orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await _orderService.updateOrderStatus(id, status);
    res.json({ msg: "Estado actualizado", order });
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await _orderService.deleteOrder(id);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ msg: error.message });
  }
};