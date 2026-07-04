import { user } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await user.findOne({
    where: {
      email
    }
  })

  if (!foundUser)
    return res.status(404).json({ msg: 'Este correo no esta registrado.' });

  const isMatch = await bcrypt.compare(password, foundUser.password_hash);

  if (!isMatch)
    return res.status(401).json({ msg: 'Contraseña incorrecta.' });

  const token = jwt.sign({
    id: foundUser.id,
    role: foundUser.role
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: '3h'
  });

  return res.status(200).json({ token });
}

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const foundUser = await user.findOne({
    where: {
      email
    }
  })

  if (!gmailRegex.test(email))
    return res.status(400).json({ msg: 'El correo debe ser de Gmail.' });

  if (foundUser)
    return res.status(409).json({ msg: 'Este correo ya esta registrado.' });

  if (password !== confirmPassword)
    return res.status(409).json({ msg: 'Las contraseñas no coinciden.' });

  const hashedPassword = await bcrypt.hash(password, 12);

  await user.create({
    name,
    email,
    password_hash: hashedPassword
  })

  return res.status(201).json({ msg: 'Usuario registrado correctamente.' });
}