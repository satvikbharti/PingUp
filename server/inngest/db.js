import connectDB from "../configs/db.js";

let isConnected = false;

export default async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}
