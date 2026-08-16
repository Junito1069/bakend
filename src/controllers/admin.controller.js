import _adminStatsService from "../services/admin.stats.service.js";

export const getDashboardStats = async (req, res) => {
  try {
    const response = await _adminStatsService.getDashboardStats()
    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const msg = error.message || 'Error del servidor.'
    return res.status(statusCode).json({ msg });
  }
}