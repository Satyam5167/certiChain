import authMiddleware from '../middleware/authMiddleware.js'
import express from 'express'
import {
    issueCertificate,
    verifyCertificate
} from '../controllers/certificateController.js'

const router = express.Router();


//only a loggeduser can issue an certificate
router.post("/issueCertificate", authMiddleware, issueCertificate);

//verify certificate is for the public user
router.post('/verifyCertificate', verifyCertificate);

export default router;