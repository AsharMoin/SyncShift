import mongoose from 'mongoose';

export default async function connectDB(uri: string | undefined) {
    if (!uri) {
        throw new Error('MongoDB URI is not provided.');
      }
    
      return mongoose.connect(uri);
}
