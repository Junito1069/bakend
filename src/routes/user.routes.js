import express from 'express';
const router = express.Router();
import { disableUser, enableUser, getAllUsers, getUserById, changeRole } from '../controllers/user.controller.js';

import { authenticateToken } from '../middlewares/authenticate.token.js';
import { authorizeRole } from '../middlewares/authorize.role.js';

router.get('/get-all', authenticateToken, authorizeRole(['admin']), getAllUsers);
router.get('/get/:userId', authenticateToken, authorizeRole(['admin', "user"]), getUserById);
router.patch('/disable/:userId', authenticateToken, authorizeRole(['admin']), disableUser);
router.patch('/enable/:userId', authenticateToken, authorizeRole(['admin']), enableUser);
router.patch('/change-role/:userId', authenticateToken, authorizeRole(['admin']), changeRole);

export default router;