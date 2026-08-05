import express from "express";
import {
  createShipment,
  deleteShipment,
  getAllShipments,
  getShipmentById,
  getShipmentsByOrder,
  updateShipmentStatus,
  updateTrackingInfo
} from "../controllers/shipment.controller.js"

import { authenticateToken } from '../middlewares/authenticate.token.js';
import { authorizeRole } from '../middlewares/authorize.role.js';

const router = express.Router();

// Crear envío
router.post("/", authenticateToken, createShipment);
// Obtener envío por ID
router.get("/:id", authenticateToken, getShipmentById);
// Obtener envíos por pedido
router.get("/order/:orderId", authenticateToken, getShipmentsByOrder);
// Obtener todos los envíos (admin)
router.get("/", authenticateToken, authorizeRole(["admin"]), getAllShipments);
// Actualizar estado de envío
router.put("/:id/status", authenticateToken, authorizeRole(["admin"]), updateShipmentStatus);
// Actualizar tracking info
router.put("/:id/tracking", authenticateToken, authorizeRole(["admin"]), updateTrackingInfo);
// Eliminar envío
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), deleteShipment);


export default router;
