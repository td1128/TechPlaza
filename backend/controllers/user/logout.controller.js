const logout=async(req,res)=>{
    try {
        res.clearCookie("token");

        res.json({
            message:"User logged out successfully",
            error:false,
            success:true,
            data:[]
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export default logout;