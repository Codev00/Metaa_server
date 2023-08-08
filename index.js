import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import cmtRoute from "./routes/comment.route.js";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/images", express.static(path.join(__dirname + "/public/images")));
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
app.use("/api/post", postRoute);
app.use("/api/cmt", cmtRoute);

// Run Server
app.listen(PORT, () => {
   console.log(`Server is running localhost ${PORT}`);
});
