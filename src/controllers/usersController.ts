import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash , compare } from "bcrypt";
import { createToken } from "../utils/tokenManager.js";
import {COOKIE_NAME} from "../utils/constant.js";

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
        const existingUser= await User.findOne({email});
        if(existingUser) return res.send("user alrady their");
        const hashPassword=await hash(password,10);
        const user= new User({name,email,password:hashPassword});
        user.save()
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          domain: "localhost",
          signed: true,
          path: "/",
        });
    
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
          path: "/",
          domain: "localhost",
          expires,
          httpOnly: true,
          signed: true,
        });
        return res.status(201).json({massage:"OKay" , id:user._id})
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({massage:"Error" ,error})
        
    }
}

export const loginUsers= async (req:Request,res:Response,next:NextFunction)=>{
  try {
      
      const {email,password}=req.body;
      const user= await User.findOne({email});
      if(!user) return res.json({message:"sorry you are not in our database"})
      const isPasswordCorrect = await compare(password, user.password);
      if(!isPasswordCorrect) return res.send("password is an correct");

      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });

      // create token and store cookie
      const token=createToken(user._id.toString(),email,"7d");

      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
      });
      return res.status(201).json({massage:"OKay" , id:user._id})
      
  } catch (error) {
      console.log(error);
      return res.status(200).json({massage:"Error" ,error})
      
  }
}