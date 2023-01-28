import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";

dotenv.config();
const app = express();
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

// Connec to Data-base
mongoose.set("strictQuery", false);
mongoose
   .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Metaa",
   })
   .then(console.log("Connectecd to database!"))
   .catch((err) => console.error({ error: err.message }));
// middleware
app.use(helmet());
app.use(morgan("common"));

// Router
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);

export default app;
