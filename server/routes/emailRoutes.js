import express from 'express'
import {
    sendOtp,
    verifyOtp,
    sendCertificate
} from '../controllers/emailController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/send-certificate', authMiddleware ,sendCertificate);


export default router;