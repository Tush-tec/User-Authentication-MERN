import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      mongoose.disconnect();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10); // Ensure this is a strong password

    // Create new admin user
    const admin = new User({
      name: 'Super Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    // Save the admin to the database
    await admin.save();
    console.log('✅ Admin created');

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    mongoose.disconnect();
  }
};

createAdmin();
