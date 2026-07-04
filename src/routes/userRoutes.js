import express from 'express';
const router = express.Router();
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

router.get('/get-all', getAllUsers);
router.get('/get/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;