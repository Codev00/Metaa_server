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
import path from "path";
import { fileURLToPath } from "url";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
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

// Upload Images
const imageStore = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "public/images");
   },
   filename: (req, file, cb) => {
      const fileName =
         Date.now() +
         "-" +
         file.originalname.toLowerCase().split(" ").join("-");
      cb(null, fileName);
   },
});
const uploadImages = multer({ storage: imageStore });
app.post("/api/images/upload", uploadImages.array("images", 12), (req, res) => {
   try {
      const files = req.files;
      return res.status(200).json(files);
   } catch (err) {
      console.log({ error: err });
   }
});

// Router
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);

export default app;
