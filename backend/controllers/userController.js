const User = require('../models/User');
const CarService = require('../models/CarService');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findById(req.user._id);
    
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addCar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cars.push(req.body);
    await user.save();
    res.status(201).send(user.cars);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await CarService.find({ user: req.user._id });
    res.send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};