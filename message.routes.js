import { Router } from "express";
import { sendMessage, getMessages } from "./message.service.js";
import { authMiddleware } from "./auth.middleware.js";
import User from "./user.model.js";

const router = Router();

// send message
router.post("/send", authMiddleware, async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { receiverEmail, text } = req.body;

    const message = await sendMessage({
      senderId: req.user.id,
      receiverEmail,
      text
    });

    res.status(201).json({ message: "Message sent", id: message._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// get msg with decryption
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { privateKey } = req.body; 
    const messages = await getMessages(req.user.id, privateKey);
    res.json(messages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
