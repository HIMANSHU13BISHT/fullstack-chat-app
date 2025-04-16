import jwt from "jsonwebtoken"
import User from "../../src/models/user.model.js"
import cookieParser from "cookie-parser"

export const protectRouter = async (req,res,next) => {
    try {
        const token = req.cookies?.jwt;  //jwt from cookie by cookieParser --> ensures cookie exist before accessing jwt
        if(!token){
            return res.status(401).json({"message":"Unauthorized - INVALID TOKEN"})
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized - Invalid or Expired Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({"message":"User Not Found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in productRouter Middleware",error.message);
        return res.status(500).json({"message":"Internal server error."});
    }
}