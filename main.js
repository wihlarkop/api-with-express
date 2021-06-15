import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';

import todoRouter from "./src/api/todoApi.js";
import morganMiddleware from "./src/utils/middleware.js";

dotenv.config()

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(morganMiddleware)

mongoose.connect(process.env.MONGODB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        connectTimeoutMS: 1000,
        dbName: 'testingDb'
    }
).then(r => console.log('Mongodb Connected'));


app.use('/api/v1/todo', todoRouter);


app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})