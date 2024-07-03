import userModel from "../../models/userModel.js"

const allUsers = async(req,res)=>{
    try {
        // console.log("userid all users",req.userId)

        const allUsers = await userModel.find();

        res.json({
            message:"All users",
            error:false,
            success:true,
            data: allUsers
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export default allUsers;