const Cart = require('../models/Cart');
const ServiceOffering = require('../models/ServiceOffering');

exports.addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    
    const service = await ServiceOffering.findById(req.body.serviceId);
    if (!service) {
      return res.status(404).send({ error: 'Service not found' });
    }
    
    const existingItem = cart.items.find(item => item.service.equals(req.body.serviceId));
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ service: req.body.serviceId, quantity: 1 });
    }
    
    await cart.save();
    res.send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => !item.service.equals(req.params.serviceId));
    await cart.save();
    
    res.send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.service');
    res.send(cart || { items: [] });
  } catch (err) {
    res.status(500).send(err);
  }
};