import userService from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Error interno del servidor al obtener los usuarios";
    return res.status(statusCode).json({ msg: message });
  }
}

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await userService.getUserById(userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Error interno del servidor al obtener el usuario";
    return res.status(statusCode).json({ msg: message });
  }
}

export const disableUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await userService.disableUser(userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Error interno del servidor al deshabilitar el usuario";
    return res.status(statusCode).json({ msg: message });
  }
}

export const enableUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await userService.enableUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Error interno del servidor al habilitar el usuario";
    return res.status(statusCode).json({ msg: message });
  }
}

export const changeRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    const response = await userService.changeUserRole(userId, role);
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Error interno del servidor al cambiar el rol del usuario";
    return res.status(statusCode).json({ msg: message });
  }
}