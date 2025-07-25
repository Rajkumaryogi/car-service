const CarService = require('../models/CarService');
const ServiceOffering = require('../models/ServiceOffering');

exports.bookService = async (req, res) => {
  try {
    const service = new CarService({
      ...req.body,
      user: req.user._id
    });
    await service.save();
    
    // Populate the serviceType before returning
    const populatedService = await CarService.findById(service._id)
      .populate('serviceType', 'name duration price')
      .lean();
    
    // req.io.emit('newBooking', populatedService);
    
    res.status(201).json({
      success: true,
      service: populatedService
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create booking'
    });
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