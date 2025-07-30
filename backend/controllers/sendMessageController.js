const SendMessageModel = require("../models/SendMessage.js");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // console.log("Received message:", { name, email, message });

    const newMessage = new SendMessageModel({ name, email, message });
    // console.log("Saving message to database:", newMessage);
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving message:", error); // helpful for debugging
    res.status(500).json({ message: "Error sending message", error });
  }
};
