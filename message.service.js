import { encryptMessage } from "./messageHelper.js";
import User from "./user.model.js";
import Message from "./message.model.js"; 
import { decryptMessage } from "./messageHelper.js";

export const sendMessage = async ({ senderId, receiverEmail, text }) => {

  console.log("receiverEmail from service:", receiverEmail);

  const receiver = await User.findOne({ email: receiverEmail });
  if (!receiver) throw new Error("Receiver not found");

  const encryptedText = encryptMessage(text, receiver.publicKey);

  const message = new Message({
    sender: senderId,
    receiver: receiver._id,
    content: encryptedText
  });

  await message.save();
  return message;
};


//Decrypt mess
export const getMessages = async (userId, privateKey) => {
  const messages = await Message.find({ receiver: userId });

  return messages.map(msg => ({
    ...msg._doc,
    content: decryptMessage(msg.content, privateKey)
  }));
};