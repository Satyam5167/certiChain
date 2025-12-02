import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import {currentUser} from '../controllers/userController.js'

const router = express.Router();

router.get('/currentUser',authMiddleware, currentUser);

export default router;