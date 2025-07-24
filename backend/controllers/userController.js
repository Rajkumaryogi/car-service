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
    const { model, year, licensePlate } = req.body;
    
    // Basic validation
    if (!model || !year || !licensePlate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(req.user._id);
    
    // Check for duplicate license plate
    if (user.cars.some(car => car.licensePlate === licensePlate)) {
      return res.status(400).json({ message: 'Car with this license plate already exists' });
    }

    const newCar = { model, year, licensePlate };
    user.cars.push(newCar);
    await user.save();
    
    // Return just the added car with its ID
    res.status(201).json(newCar);
    // console.log(newCar);
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ message: 'Server error while adding car' });
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