import bcryptjs from 'bcryptjs';
import userModel from '../models/userModel.js'

const signUp=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        // console.log(req.body)

        const user=await userModel.findOne({email});
        if(user){
            throw new Error("User already exists");
        }
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt=bcryptjs.genSaltSync(10);
        const hashedPassword=bcryptjs.hashSync(password,salt);

        if(!hashedPassword){
            throw new Error("Something went wrong");
        }

        const payload={
            ...req.body,
            role:"GENERAL",
            password:hashedPassword
        }

        const userData=new userModel(payload);

        const saveUser=await userData.save()

        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:"User created successfully"
        })

    } catch (error) {
        // console.log(error.message);
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export default signUp;