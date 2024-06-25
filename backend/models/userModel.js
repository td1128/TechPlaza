import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    role:{
        type:String
    }
},{
    timestamps:true
})

const userModel=mongoose.model("user",userSchema);

export default userModel;