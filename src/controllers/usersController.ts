import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash } from "bcrypt";


export const getAllUsers = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const users=await User.find();
    return res.status(200).json({massage:"OKay" ,users})
    
  } catch (error) {
    console.log(error);
    
    return res.status(200).json({massage:"Error" ,error})
  }
   

}

export const createUsers= async (req:Request,res:Response,next:NextFunction)=>{
    try {

        const {name,email,password}=req.body;
        const hashPassword=await hash(password,10);
        const user= new User({name,email,password:hashPassword});
        user.save()
        return res.status(201).json({massage:"OKay" , id:user._id})
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({massage:"Error" ,error})
        
    }


}