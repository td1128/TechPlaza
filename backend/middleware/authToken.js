import jwt from 'jsonwebtoken';

const authToken = async(req,res,next)=>{
    try {
        const token = req.cookies?.token

        if(!token){
            return res.status(200).json({
                message:"Please Login",
                data:[],
                error:true,
                success:false,
            })
        }

        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            // console.log(err)
            // console.log(decoded)
            if(err){
                console.log(err);
            }
            req.userId = decoded?._id
            next()
        })
        // console.log(token)
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            data:[],
            error:true,
            success:false,
        })
    }
}

export default authToken;