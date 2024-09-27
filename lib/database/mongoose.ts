import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global object in TypeScript to include the mongoose property
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

// Use the cached mongoose connection from global, or create a new cache
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: 'imaginify',
    bufferCommands: false,
  });

  cached.conn = await cached.promise;

  // Assign the cached connection to global.mongoose
  global.mongoose = cached;

  return cached.conn;
};
