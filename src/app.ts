import dotenv from "dotenv";
import express from "express";

import { Mongoose } from "mongoose";
import redis, { RedisClient } from "redis";

import loggerMiddleware from "./helpers/Logger";

dotenv.config();

// Routers
import toDoRouter from "./routes/apiRouter";

// Global Variables.
const app = express();

const PORT = process.env.PORT;

const mongoUri: string = process.env.MONGODB_URI as string;

// Initialization.
const mongoose = new Mongoose();

// Application Middleware.
app.use(express.static(__dirname));

app.use(express.json());

app.use(loggerMiddleware);

app.use(express.urlencoded({ extended: true }));

// Application Routes.
app.use("/", toDoRouter);

// Add call back to connect to the database.
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('DB connection successful!'));

// Redis Client Setup
let redisClient: RedisClient;

(async () => {
    redisClient = redis.createClient({
        // url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.SERVER_REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    redisClient.connected;

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    redisClient.on("connect", () => console.log("Redis Client Connected!"));
})();

app.listen(PORT, () => {
    console.log(`To - Do API is live, listening on port ${PORT}.`);
});