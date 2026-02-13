
import crypto from "crypto";

export const encryptMessage = (message, publicKey) => {
  const encrypted = crypto.publicEncrypt(
    publicKey,
    Buffer.from(message)
  );
  return encrypted.toString("base64");
};

export const decryptMessage = (encryptedMessage, privateKey) => {
  const decrypted = crypto.privateDecrypt(
    privateKey,
    Buffer.from(encryptedMessage, "base64")
  );
  return decrypted.toString();
};
