const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");
const sendEmail = require("../utils/emailSender");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    //if duplicate user is found, return error
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists : login please" });
    }
    await user.save();
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });
    res
      .status(201)
      .send({ user, token })
      .json({ message: "Register Successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  console.log("email", email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message: `Click this link to reset your password: ${resetUrl}`,
    });

    res.send({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};


// reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).send({ error: 'Password is required' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.send({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).send({ error: 'Failed to reset password' });
  }
};
