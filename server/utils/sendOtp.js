import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS
    }
})

/** 
@param to: receivers Email
@param otp: one time password
*/
const sendOtpEmail = async (to, otp) => {

    const mailOptions = {
        from: `CertiChain <${process.env.MY_EMAIL}>`,
        to,
        subject: '🔐 Your CertiChain OTP Code',
        html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0b12; color: #ffffff; padding: 30px; border-radius: 12px; max-width: 500px; margin: auto; border: 1px solid #2c2c3a;">
            <div style="text-align: center;">
            <div style="display: inline-block; padding: 12px; border-radius: 10px; background: linear-gradient(135deg, #7f5af0, #2cb67d); margin-bottom: 15px;">
                <img src="https://img.icons8.com/fluency/96/certificate.png" alt="CertiChain Logo" width="60" height="60" />
            </div>
            <h1 style="font-size: 28px; margin: 10px 0; background: linear-gradient(90deg, #7f5af0, #2cb67d); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                CertiChain Verification
            </h1>
            <p style="color: #b3b3b3; font-size: 16px;">Secure Access with Blockchain Authentication</p>
            </div>

            <div style="background-color: #141420; padding: 25px; border-radius: 10px; margin-top: 25px;">
            <p style="font-size: 16px; color: #ccc;">Hello,</p>
            <p style="font-size: 16px; color: #ccc;">Your One-Time Password (OTP) for logging into <strong>CertiChain</strong> is:</p>

            <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; background: linear-gradient(135deg, #7f5af0, #2cb67d); color: white; font-size: 26px; letter-spacing: 5px; font-weight: bold; padding: 15px 40px; border-radius: 10px;">
                ${otp}
                </div>
            </div>

            <p style="color: #b3b3b3; font-size: 15px;">
                This OTP will expire in <strong>5 minutes</strong>. Please do not share this code with anyone — CertiChain will never ask for your OTP.
            </p>

            <p style="margin-top: 30px; color: #888; font-size: 13px; text-align: center;">
                Need help? Contact our support team at 
                <a href="mailto:support@certichain.com" style="color: #7f5af0; text-decoration: none;">support@certichain.com</a>
            </p>
            </div>

            <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} CertiChain. All rights reserved.</p>
            <p style="font-size: 11px;">Empowering trust through blockchain technology.</p>
            </div>
        </div>
        `
    };




    try {
        const res = await transporter.sendMail(mailOptions)
        console.log('Email Sent', res.response)
    } catch (error) {
        console.log(error.message)
        throw new Error('Failed to send OTP email')
    }

}

export default sendOtpEmail;