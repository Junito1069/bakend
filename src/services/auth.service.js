import { AppError } from '../middlewares/app.error.js'
import { user } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
process.loadEnvFile();

class AuthService {
  async login({ email, password }) {
    const foundUser = await user.findOne({
      where: {
        email
      }
    })

    if (!foundUser)
      throw new AppError("Este correo no esta registrado", 404);

    const isMatch = await bcrypt.compare(password, foundUser.password_hash);

    if (!isMatch)
      throw new AppError("Contraseña incorrecta.", 401);

    const token = jwt.sign({
      id: foundUser.id,
      role: foundUser.role
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '3h'
    });

    return { token };
  }

  async register({ name, email, password, confirmPassword }) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    const foundUser = await user.findOne({
      where: {
        email
      }
    })

    if (!gmailRegex.test(email))
      throw new AppError("El correo debe ser de Gmail.", 400);

    if (foundUser)
      throw new AppError("Este correo ya esta registrado.", 409);

    if (password !== confirmPassword)
      throw new AppError("Las contraseñas no coinciden.", 400);

    const hashedPassword = await bcrypt.hash(password, 12);

    await user.create({
      name,
      email,
      password_hash: hashedPassword
    })

    return { msg: 'Usuario registrado correctamente.' };
  }

  async verifyAccount(data) {

  }
}

export default new AuthService();