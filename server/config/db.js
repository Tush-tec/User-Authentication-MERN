import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Log the MONGO_URI to check if it's being loaded correctly
        console.log('Mongo URI:', process.env.MONGO_URI);

        // Ensure the URI is a string
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
