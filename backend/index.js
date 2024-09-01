import express from "express";
import { MONGODBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./Routes/bookRoutes.js";
import cors from "cors";
const app = express();
//two methods to declare cors
//1st method

// app.use(cors());

//2nd method

app.use(
  cors({
    origin: "https://book-store-mern-client-lac.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
//middle ware to read our request body
app.use(express.json());
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN app");
});

app.use("/books", bookRoutes);

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log(`Connected to mongoDB`);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
