import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import authRouter from "./src/api/authApi.js"
import fetchRouter from "./src/api/fetchApi.js";
import todoRouter from "./src/api/todoApi.js";

import logger from "./src/utils/logger.js";
import jwtBearer from "./src/utils/dependency.js";

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())
app.use(logger)

mongoose.connect(process.env.MONGODB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        connectTimeoutMS: 1000,
        dbName: "testingDb"
    }
).then(r => console.log("Mongodb Connected"));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", jwtBearer, todoRouter);
app.use("/api/v1/fetch", fetchRouter)


app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})