const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");
const sendEmail = require("../utils/emailSender");
const bcrypt = require("bcryptjs"); // Using bcryptjs instead of bcrypt

// Helper function for error responses
const errorResponse = (res, status, message) => {
  return res.status(status).json({
    success: false,
    error: message
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "Email already registered. Please login");
    }

    // Create new user
    const user = new User(req.body);
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token,
      message: "Registration successful"
    });

  } catch (err) {
    console.error("Registration error:", err);
    return errorResponse(res, 400, "Registration failed");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token,
      message: "Login successful"
    });

  } catch (err) {
    console.error("Login error:", err);
    return errorResponse(res, 500, "Login failed");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return errorResponse(res, 400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const resetToken = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `Please click the following link to reset your password: ${resetUrl}`
    });

    return res.status(200).json({
      success: true,
      message: "Password reset email sent"
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    return errorResponse(res, 500, "Failed to process password reset");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return errorResponse(res, 400, "Password must be at least 6 characters");
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return errorResponse(res, 400, "Invalid or expired token");
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (err) {
    console.error("Reset password error:", err);
    
    if (err.name === 'TokenExpiredError') {
      return errorResponse(res, 400, "Password reset token has expired");
    }
    
    if (err.name === 'JsonWebTokenError') {
      return errorResponse(res, 400, "Invalid password reset token");
    }

    return errorResponse(res, 500, "Failed to reset password");
  }
};