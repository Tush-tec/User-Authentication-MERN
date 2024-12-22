import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


 const router = express.Router();

 const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'});
 };

 router.post('/register', async (req,res)=>{
    const {name, email,password} =req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }    
        const user = await User.create({name,email,password});

        res.status(201).json({
            message:"User created successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
            token:generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({error:'Server error',error});
    }
 });

 router.post('/login', async(req,res)=>{
    const {email,password}= req.body;

    try {
        const user = await User.findOne({email});

        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({message:'Invalid credentials'})
        }
        res.status(200).json({
            message:"User logged in Successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            },
            token:generateToken(user._id)
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({error:'Server error', error})
    }
 })
export default router;