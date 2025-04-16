import express from "express"
import { protectRouter } from "../middleware/auth.middleware.js";
import { getUsersForSidebar,getMessages,sendMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",protectRouter,getUsersForSidebar);
router.get("/:id",protectRouter,getMessages);
router.post("/send/:id",protectRouter,sendMessages);

export default router;