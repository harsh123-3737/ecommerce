import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    console.log("Connected to:", mongoose.connection.name);
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
  }
};

export default connectDB;
