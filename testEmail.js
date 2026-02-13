import dotenv from "dotenv";
dotenv.config(); 

import { transporter } from "./email.js"; 


console.log("HOST:", process.env.MAILTRAP_HOST);
console.log("PORT:", process.env.MAILTRAP_PORT);
console.log("USER:", process.env.MAILTRAP_USER);
console.log("PASS:", process.env.MAILTRAP_PASS);

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: '"No Reply" <noreply@example.com>',
      to: "test@example.com", 
      subject: "Test Email",
      text: "Hello! This is a test email from Node using Mailtrap."
    });

    console.log("✅ Email sent successfully!", info.messageId);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}

testEmail();
