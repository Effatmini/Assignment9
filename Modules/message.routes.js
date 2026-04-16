import express from "express";
import { sendMessage, getMessages } from "./message.service.js";
import { authMiddleware } from "./auth.middleware.js";

const router = express.Router();

// Send message
router.post("/send", authMiddleware, async (req, res) => {
  try {
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

// Get messages
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await getMessages(req.user.id);
    res.json(messages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;