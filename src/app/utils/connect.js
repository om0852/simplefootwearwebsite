import mongoose from "mongoose";

export const connectToDB = async () => {
  const url = process.env.DB_URL;
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    mongoose.connect(url);
  }
};
