import _authService from '../services/auth.service.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await _authService.login({ email, password })
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const msg = error.message || 'Error del servidor.'
    return res.status(statusCode).json({ msg });
  }
}

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const response = await _authService.register({ name, email, password, confirmPassword })
    return res.status(201).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const msg = error.message || 'Error del servidor.'
    return res.status(statusCode).json({ msg });
  }
}