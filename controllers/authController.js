const { v4: uuidv4 } = require("uuid");
const { encryptPassword, comparePassword } = require("../utils/hashPassword");
const User = require("../models/user");
const { createToken } = require("../utils/token");

class AuthController {
  async register(req, res) {
    // collect data
    const { name, email, password } = req.body;
    // validate data
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }
    // Check if user already register or not
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(403).json({
        message: "User already present",
      });
    }
    // encrypt the password
    const hashPassword = await encryptPassword(password);
    // save in database
    const newUser = new User({
      uid: uuidv4(),
      name,
      email,
      password: hashPassword,
    });
    console.log(newUser);
    try {
      await newUser.save();
      // create token for user
      const accessToken = createToken({
        uid: newUser.uid,
      });
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        path: "/",
        sameSite: process.env.SAMESITE,
        secure: true,
        maxAge: 8 * 24 * 60 * 60 * 1000, // 8 days
      });
      res.status(200).json({
        message: "User created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
  async login(req, res) {
    // collect data
    console.log("login request...");
    const { email, password } = req.body;
    // validate data
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }
    // Check if user is register or not
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(403).json({
        message: "User not present",
      });
    }
    // compare password
    const compare = await comparePassword(password, user.password);
    if (!compare) {
      return res.status(400).json({
        message: "Password not matching!",
      });
    }
    // Generate token
    const accessToken = createToken({
      uid: user.uid,
    });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: process.env.SAMESITE,
      secure: true,
      maxAge: 8 * 24 * 60 * 60 * 1000, // 8 days
    });
    res.status(200).json({
      message: "User login successfully",
    });
  }
  logout(req, res) {}
}

module.exports = new AuthController();
