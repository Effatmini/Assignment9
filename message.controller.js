import { sendMessage, getMyMessages } from "./message.service.js";

export const sendMessageController = async (req, res) => {
  try {
    const message = await sendMessage({
      senderId: req.user.id,
      content: req.body.content
    });
    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyMessagesController = async (req, res) => {
  try {
    const messages = await getMyMessages(req.user.id);
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
