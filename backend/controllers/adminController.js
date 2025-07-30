const Admin = require("../models/Admin");
const User = require("../models/User");
const CarService = require("../models/CarService");
const ServiceOffering = require("../models/ServiceOffering");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }

    const token = jwt.sign({ id: admin._id }, secret, { expiresIn });

    // Initialize tokens array if it doesn't exist
    if (!admin.tokens) {
      admin.tokens = [];
    }

    admin.tokens = admin.tokens.concat({ token });
    await admin.save();

    res.send({
      token,
      admin: {
        _id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
    // console.log("Admin tokens:", admin.tokens);
  } catch (err) {
    console.error("Login error:", err);
    res.status(400).send({
      error: "Login failed",
      details: err.message,
    });
  }
};

exports.adminLogout = async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();
    res.send({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).send({ error: "Logout failed" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // console.log("Admin making request:", req.admin); // Debug log
    const users = await User.find({});
    // console.log("Found users:", users.length); // Debug log
    res.send(users);
  } catch (err) {
    // console.error("Get all users error:", err); // Debug log
    res.status(500).send(err);
  }
};

//for user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password") // Exclude password
      .populate("cars");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.error("Get user details error:", err); // Debug log
    res.status(500).send(err);
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await CarService.find({}).populate("user");
    res.send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await CarService.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.send(booking);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await ServiceOffering.find({});
    res.send(services);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addService = async (req, res) => {
  try {
    const service = new ServiceOffering(req.body);
    await service.save();
    res.status(201).send(service);
  } catch (err) {
    res.status(400).send(err);
  }
};

// for the delete of the service

exports.deleteService = async (req, res) => {
  try {
    await ServiceOffering.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
};
