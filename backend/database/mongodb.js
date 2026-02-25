import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from 'dotenv';

if( !DB_URI ) {
    throw new Error('Database URI is not defined in environment variables');
}
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB');

        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }

    export default connectDB;