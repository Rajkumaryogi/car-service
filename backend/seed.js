require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Admin = require('./models/Admin');
const ServiceOffering = require('./models/ServiceOffering');
const CarService = require('./models/CarService');
const Cart = require('./models/Cart');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Clear existing data
const clearData = async () => {
  await User.deleteMany();
  await Admin.deleteMany();
  await ServiceOffering.deleteMany();
  await CarService.deleteMany();
  await Cart.deleteMany();
  console.log('Existing data cleared');
};

// Seed data
const seedData = async () => {
  try {
    await clearData();

    // Create Admin
    const admin = new Admin({
      email: 'rajyogi1811@gmail.com',
      password: 'Pass1234',
      name: 'Admin User',
      tokens: [] // Explicitly initialize tokens array
    });
    await admin.save();
    console.log('Admin created:', admin.email);

    // Create Users
    const user1 = new User({
      name: 'Yogi',
      email: 'yogi@gmail.com',
      password: 'Pass1234',
      phone: '1234567890',
      cars: [{
        model: 'Toyota Camry',
        year: 2020,
        licensePlate: 'ABC123'
      }]
    });

    const user2 = new User({
      name: 'Mahi',
      email: 'mahi@gmail.com',
      password: 'Pass1234',
      phone: '9876543210',
      cars: [{
        model: 'Honda Civic',
        year: 2019,
        licensePlate: 'XYZ789'
      }, {
        model: 'Ford F-150',
        year: 2021,
        licensePlate: 'DEF456'
      }]
    });

    await user1.save();
    await user2.save();
    console.log('Users created:', user1.email, user2.email);

    // Create Service Offerings
    const services = [
      {
        name: 'Oil Change',
        description: 'Standard oil and filter change',
        price: 49.99,
        duration: 30
      },
      {
        name: 'Tire Rotation',
        description: 'Rotate all four tires',
        price: 29.99,
        duration: 20
      },
      {
        name: 'Brake Inspection',
        description: 'Complete brake system inspection',
        price: 39.99,
        duration: 45
      },
      {
        name: 'Full Car Inspection',
        description: 'Complete vehicle inspection',
        price: 89.99,
        duration: 60
      }
    ];

    const createdServices = await ServiceOffering.insertMany(services);
    console.log('Services created:', createdServices.length);

    // Create Car Services (Bookings)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const bookings = [
      {
        user: user1._id,
        car: {
          model: user1.cars[0].model,
          licensePlate: user1.cars[0].licensePlate
        },
        serviceType: createdServices[0]._id,
        scheduledDate: tomorrow,
        status: 'Pending',
        notes: 'Please check the AC as well',
        invoice: {
          totalCost: createdServices[0].price,
          paymentStatus: 'Unpaid'
        }
      },
      {
        user: user2._id,
        car: {
          model: user2.cars[0].model,
          licensePlate: user2.cars[0].licensePlate
        },
        serviceType: createdServices[2]._id,
        scheduledDate: nextWeek,
        status: 'Approved',
        invoice: {
          totalCost: createdServices[2].price,
          paymentStatus: 'Paid'
        }
      }
    ];

    const createdBookings = await CarService.insertMany(bookings);
    console.log('Bookings created:', createdBookings.length);

    // Create Carts
    const cart1 = new Cart({
      user: user1._id,
      items: [
        { service: createdServices[1]._id, quantity: 1 },
        { service: createdServices[3]._id, quantity: 1 }
      ]
    });

    const cart2 = new Cart({
      user: user2._id,
      items: [
        { service: createdServices[0]._id, quantity: 2 }
      ]
    });

    await cart1.save();
    await cart2.save();
    console.log('Carts created for users');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();