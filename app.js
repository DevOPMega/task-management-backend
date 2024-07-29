const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const connect = require("./config/index");

const PORT = process.env.PORT || 8080;

const app = express();

const corsOptions = {
    origin: process.env.ORIGIN, //included origin as true
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true, //included credentials as true
};

// Connect to MongoDB Atlas
connect();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})