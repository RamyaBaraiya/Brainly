import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import router from "./routes/signup";

const app = express();

// ✅ Add these two middlewares BEFORE router
app.use(cors());
app.use(express.json()); // <-- This is critical

app.use("/api/v1", router);

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
  console.log("Connected to MongoDB");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
