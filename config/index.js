const mongoose = require("mongoose");

const connectionURI = process.env.MONGODB_URI;

async function connect() {
    try {
        await mongoose.connect(connectionURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error in connection ", error.message);
    }
}

module.exports = connect;