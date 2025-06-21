import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const users = [
  {
    name: 'Rohan Jambhulkar',
    email: 'rohan.jambhulkar@example.com',
    password: 'rohan1234', // Ideally you'd hash this, but it's fine for dummy data
    isAdmin: true,
  },
  {
    name: 'Rohit Jambhulkar',
    email: 'rohit.jambhulkar@example.com',
    password: 'rohit1234',
  },
  {
    name: 'Arjun Verma',
    email: 'arjunverma@example.com',
    password: 'arjun1234',
  },
  {
    name: 'Sneha Kapoor',
    email: 'snehakapoor@example.com',
    password: 'sneha1234',
  },
  {
    name: 'Ravi Nair',
    email: 'ravinair@example.com',
    password: 'ravi1234',
  },
];

const seedUsers = async () => {
  try {
    await User.deleteMany(); // Clear existing users
    const createdUsers = await User.insertMany(users);

    console.log('✅ Dummy users seeded:', createdUsers.map(u => u.name));
    process.exit();
  } catch (error) {
    console.error('❌ Failed to seed users:', error.message);
    process.exit(1);
  }
};

seedUsers();
