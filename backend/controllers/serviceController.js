const CarService = require('../models/CarService');
const ServiceOffering = require('../models/ServiceOffering');

exports.bookService = async (req, res) => {
  try {
    const service = new CarService({
      ...req.body,
      user: req.user._id
    });
    await service.save();
    
    // Emit socket event for new booking
    req.io.emit('newBooking', service);
    
    res.status(201).send(service);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await ServiceOffering.find({ isActive: true });
    res.send(services);
    
  } catch (err) {
    res.status(500).send(err);
  }
};