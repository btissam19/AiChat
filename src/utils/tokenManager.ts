import jwt from "jsonwebtoken";

export const  createToken=(id:string,email:string,experdIn:string)=>{
    const payload={ id,email };
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn :experdIn,});// we have to put right expresIn name
    return token ;

}
