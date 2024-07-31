const mongoose = require("mongoose");

// User Schema 
const userSchema = new mongoose.Schema({
    uid: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create the user model 
const User = mongoose.model("User", userSchema);

module.exports = User;