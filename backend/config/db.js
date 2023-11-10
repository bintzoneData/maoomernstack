import mongoose from 'mongoose';
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected: ${conn.connection.host}`.underline.blue);
  } catch (error) {
    console.error(`Error: ${error.message}`.underline.red);
    process.exit(1);
  }
};

export default connectDb;
