import User from "./user.model.js";
import Message from "./message.model.js";

// Send message
export const sendMessage = async ({ senderId, receiverEmail, text }) => {
  const receiver = await User.findOne({ email: receiverEmail });
  if (!receiver) throw new Error("Receiver not found");

  const message = new Message({
    sender: senderId,
    receiver: receiver._id,
    content: text
  });

  await message.save();
  return message;
};

// Get messages for a user
export const getMessages = async (userId) => {
  const messages = await Message.find({ receiver: userId }).populate("sender", "email");
  return messages;
};