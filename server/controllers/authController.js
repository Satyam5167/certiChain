import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authQueries from '../queries/authQueries.js';
import otpStore from '../otpStore.js';

export const login = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email or password is not valid"});
    }
    
    try{
        const user = await authQueries.findUserByEmail(email);

        if(!user){
            return res.status(404).json({message:"User is not registered"});
        }

        const isValidUser = await bcrypt.compare(password,user.password_hash);
        if(!isValidUser){
            return res.status(400).json({message:"Wrong Password"});
        }

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:"6h"});
        res.json({token});
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"Login Failed due to server error"});
    }
}

export const register = async(req,res)=>{
    const {name, email, password, company_name} = req.body;
    if(!name || !email || !password || !company_name){
        return res.status(400).json({message: "Email , password or company_name can not be empty"});
    }

    const otpRecord = otpStore.get(email);

    if(!otpRecord || !otpRecord.verified){
        return res.status(400).json({message:"Please verify email via otp first"})
    }

    try {
        const existingUser = await authQueries.findUserByEmail(email);

        if(existingUser){
            return res.status(409).json({message:"User already registered"});
        }

        const hashedPassword = await bcrypt.hash(password,8);

        const newUser = await authQueries.createUser(name, email, hashedPassword, company_name);

        otpStore.delete(email);

        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET, {expiresIn:"6h"});
        
        res.json({token});
    } catch (error) {
        console.error("Register Failed:", error.message);
        res.status(500).json("Registration Failed due to server error");
    }
};