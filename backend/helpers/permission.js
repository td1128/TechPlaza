import userModel from "../models/userModel.js"

const permission=async(userId)=>{
    const user = await userModel.findById(userId)
    if(user.role!=="ADMIN"){
        return false
    }else{
        return true
    }
}

export default permission;