import sendOtpEmail from "../utils/sendOtp.js";
import otpStore from "../otpStore.js";
import sendCertificateMail from '../utils/sendCertificate.js'

export const sendOtp = async(req, res) => {
    const {email} = req.body;
    const otp = Math.floor(100000 + Math.random()*900000);
    const expiresAt = Date.now() + 5 *60 *1000;
    otpStore.set(email, {otp, expiresAt, verified: false});

    try {
        await sendOtpEmail(email, otp);
        res.json({message: "Otp sent sucessfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Error sending otp"})
    }
}

export const verifyOtp = async(req, res) => {
    const {email , otp} = req.body;
    const otpRecord = otpStore.get(email)
    if(!otpRecord || otpRecord.expiresAt < Date.now() || otpRecord.otp != otp){
        return res.status(400).json({message:"Invalid or expired otp"})
    }

    otpStore.set(email, {...otpRecord, verified : true})
    res.json({message: "Otp verified"})
}

export const sendCertificate = async(req,res) =>{
    const { student_email, certificate_uid, transaction_hash } = req.body;
    try {
        await sendCertificateMail(student_email, certificate_uid, transaction_hash)
        res.json({message: "SucessFully sent certificate via email"}) 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Error sending Certificate via email"})
    }
}