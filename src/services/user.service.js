import { AppError } from "../middlewares/app.error.js";
import { user } from "../models/user.js";

class UserService {
  async getAllUsers() {

    const users = await user.findAll({
      attributes: {
        exclude: ['password_hash', 'created_at', 'updated_at']
      }
    })

    return users;
  }

  async getUserById(userId) {
    const foundUser = await user.findByPk(userId);

    if (!foundUser) {
      throw new AppError(`No se encontro ningun usuario con el id ${userId}`, 404);
    }

    return foundUser;
  }

  async disableUser(userId) {
    const foundUser = await user.findByPk(userId);

    if (!foundUser) {
      throw new AppError(`No se encontro ningun usuario con el id ${userId}`, 404);
    }

    if (!foundUser.is_active) {
      throw new AppError(`El usuario con el id ${userId} ya se encuentra deshabilitado`, 400);
    }

    foundUser.is_active = false;
    await foundUser.save();

    return foundUser;
  }

  async enableUser(userId) {
    const foundUser = await user.findByPk(userId);

    if (!foundUser) {
      throw new AppError(`No se encontro ningun usuario con el id ${userId}`, 404);
    }

    if (foundUser.is_active) {
      throw new AppError(`El usuario con el id ${userId} ya se encuentra habilitado`, 400);
    }

    foundUser.is_active = true;
    await foundUser.save();

    return foundUser;
  }

  async changeUserRole(userId, role) {
    const roles = ["admin", "user"];

    if (!roles.includes(role)) {
      throw new AppError(`El rol ${role} no es valido`, 400);
    }

    const foundUser = await user.findByPk(userId);

    if (!foundUser) {
      throw new AppError(`No se encontro ningun usuario con el id ${userId}`, 404);
    }

    if (foundUser.role === role) {
      throw new AppError(`Este usuario ya tiene este rol.`, 400);
    }

    foundUser.role = role;
    await foundUser.save();

    return foundUser;
  }
}

export default new UserService();