import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import authRouter from "./api/authApi.js"
import diaryRouter from "./api/diaryApi.js";
import fetchRouter from "./api/fetchApi.js";
import todoRouter from "./api/todoApi.js";

import logger from "./utils/logger.js";
import jwtBearer from "./utils/dependency.js";
import JsonResponse from "./utils/response.js";


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

app.get('/api/v1/alive', (req, res) => {
    res.json(JsonResponse('alive'))
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/diary", diaryRouter);
app.use("/api/v1/todo", jwtBearer, todoRouter);
app.use("/api/v1/fetch", fetchRouter)


app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})