import Message from "../models/message.models.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId,io } from "../lib/socket.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUserForSideBar:",error.message);
        res.status(500).json({"error":"Internal server error"});
    }
}

export const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages",error.message);
        res.status(500).json({"error":"Internal Server Error."});
    }
}

// export const sendMessages = async(req,res) =>{ 
//     try {
//         const {text,image} = req.body;
//         const {id:receiverId} = req.params;
//         const senderId = req.user._id;

//         let imageUrl;
//         if(image){
//             if (!image.startsWith("data:image/")) {
//                 console.error("Invalid image format");
//                 return;
//             }
//             // console.log("Uploading image to Cloudinary...");
//             const uploadResponse = await cloudinary.uploader.upload(image);
//             // console.log("Upload successful:", uploadResponse.secure_url);
//             imageUrl = uploadResponse.secure_url;
//         }
//         const newMessage = new Message({
//             senderId,
//             receiverId, 
//             text,
//             image:imageUrl,
//         });
//         await newMessage.save();

//         //todo : real time functionality goes here => socket.io
//         res.status(201).json(newMessage);

//     } catch (error) {
//         console.log("Error in sendMessage controller:",error);
//         res.status(500).json({"error":"Internal Server Error."});
//     }
// }
// export const sendMessages = async (req, res) => {
//     try {
//         const { text, image } = req.body;
//         const { id: receiverId } = req.params;
//         const senderId = req.user._id;

//         let imageUrl;

//         // Helper function to add a timeout to cloudinary upload
//         const uploadWithTimeout = (image) =>
//             Promise.race([
//                 cloudinary.uploader.upload(image),
//                 new Promise((_, reject) => setTimeout(() => reject(new Error("Upload Timeout")), 10000))
//             ]);

//         if (image) {
//             if (!image.startsWith("data:image/")) {
//                 console.error("Invalid image format");
//                 return res.status(400).json({ error: "Invalid image format" });
//             }

//             try {
//                 console.log("Uploading image to Cloudinary...");
//                 const uploadResponse = await uploadWithTimeout(image);
//                 console.log("Upload successful:", uploadResponse.secure_url);
//                 imageUrl = uploadResponse.secure_url;
//             } catch (uploadErr) {
//                 console.error("Cloudinary upload failed (full error):", uploadErr);
//                 return res.status(500).json({ error: "Image upload failed or timed out" });
//             }
//         }

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             text,
//             image: imageUrl,
//         });

//         await newMessage.save();

//         // TODO: add socket.io logic here for real-time updates
//         res.status(201).json(newMessage);

//     } catch (error) {
//         console.error("Error in sendMessage controller:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image,  // Directly save the image URL passed from the frontend
        });

        await newMessage.save();

        //Add socket.io logic here for real-time updates
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error in sendMessage controller:", error);
        res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
};