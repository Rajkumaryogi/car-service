const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');
const sendEmail = require('../utils/emailSender');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn });
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    
    const resetToken = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      message: `Click this link to reset your password: ${resetUrl}`
    });
    
    res.send({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).send(err);
  }
};