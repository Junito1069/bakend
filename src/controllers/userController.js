import { user } from "../models/user.js";

export const getAllUsers = async (req, res) => {

  const allUsers = await user.findAll({
    attributes: {
      exclude: ['password_hash']
    }
  });

  return res.status(200).json(allUsers);
}

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const foundUser = await user.findOne({
    where: {
      id
    }
  })

  if (!foundUser)
    return res.status(404).json({ msg: 'El usuario no ha sido encontrado.' });

  return res.status(200).json(foundUser);
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const foundUser = await user.findOne({
    where: {
      id
    }
  })

  if (!foundUser)
    return res.status(404).json({ msg: 'El usuario no ha sido encontrado.' });

  foundUser.name = name;
  foundUser.email = email;

  await foundUser.save();

  return res.status(200).json({ msg: 'Usuario actualizado correctamente.' });
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const foundUser = await user.findOne({
    where: {
      id
    }
  })

  if (!foundUser)
    return res.status(404).json({ msg: 'El usuario no ha sido encontrado.' });

  await foundUser.destroy();

  return res.status(200).json({ msg: 'Usuario eliminado correctamente.' });
}