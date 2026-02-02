import User from "../models/User.js";


export const protect = async (req, res, next) => {
    try {
        if (!req.auth) {
            return res.status(401).json({success: false, message: "No Auth Context"});
        }

        const {userId} = req.auth;
        if(!userId ){
            return res.status(401).json({success : false, message : "Not Authenticated"});
        }
        
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({success : false, message : "User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({success: false, message: error.message});
    }
}