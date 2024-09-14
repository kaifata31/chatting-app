import mongoose from "mongoose";

export const connectMongodb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Error in connecting mongodb database");
  }
};
