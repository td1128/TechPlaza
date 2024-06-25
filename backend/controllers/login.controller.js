import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

const login=async(req,res)=>{
    try {
        const {email,password} =req.body;
        if(!email){
            throw new Error("Please provide email");
        }
        if(!password){
            throw new Error("Please provide password");
        }

        const user=await userModel.findOne({email});
        if(!user){
            throw new Error("User does not exists");
        }
        const checkedPassword=await bcryptjs.compareSync(password,user.password);
        if(checkedPassword){
            const tokenData={
                _id:user._id,
                email:user.email
            }
            const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:60*60*8});
            const tokenOption={
                httpOnly:true,
                secure:true
            }
            res.cookie("token",token,tokenOption).json({
                message:"User logged in successfully",
                data:token,
                success:true,
                error:false,
                user:user
            })
        }
        else{
            throw new Error("Invalid password");
        }
        
        // console.log(checkedPassword);

    } catch (error) {
        // console.log(error.message);
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export default login;