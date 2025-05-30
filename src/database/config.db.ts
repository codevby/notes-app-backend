import mongoose from "mongoose";

export async function dbConnection() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL!);
    console.clear();
    console.log("DataBase Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to database");
  }
}
