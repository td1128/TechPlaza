import mongoose from "mongoose";

async function connectToDB() {
    try{
        mongoose.connect(process.env.MONGODB_URI)
        // console.log('Connected to DB');
    }
    catch(err){
        console.log(err)
    }
}

export default connectToDB;
