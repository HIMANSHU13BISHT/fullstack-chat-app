import dotenv from "dotenv";
dotenv.config();  // Load .env file at the very beginning

import express from "express";
// import bodyParser from "body-parser"
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";
import {app, server} from "./lib/socket.js"

// const app = express();
const PORT = process.env.PORT || 5000;  // Ensure PORT has a default value
const __dirname = path.resolve();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true, 
})) 

// app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages/", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}


server.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    
    try {
        await connectDB();  // Ensure database connects
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
});
