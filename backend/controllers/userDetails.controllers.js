import userModel from "../models/userModel.js"

const userDetails =async(req,res)=>{
    try {
        // console.log("user id",req.userId);
        const user=await userModel.findById(req.userId);
        // console.log("user",user);
        res.status(200).json({
            message:"User details",
            data:user,
            error:false,
            success:true,
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}

export default userDetails;