import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


 const router = express.Router()

   router.port('/register', async (req,res)=>{
    try {
        const {name,email,password}= req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const user = await User.create({name,email,password});
        res.send(201).json({message:"User registerd successfully",user});
    } catch (error) {
        res.status(500).json({message:"Server Error",error})
    }
   });

   router.post('/login',async(req,res)=>{
    try {
        const{email,password} = req.body

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"Invalid email or password"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({message:"User logged in successfully",token})

    } catch (error) {
        res.send(500).json({message:"Server Error",error});
    }
   })
    
export default router;