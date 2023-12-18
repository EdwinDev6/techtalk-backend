import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { SECRET } from "../config.js";
import { sendResetPasswordEmail } from "./mailer.controller.js";

export const signupHandler = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      password,
    });

    // verificando roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // guardando en mongo
    const savedUser = await newUser.save();

    // Creando el token
    const token = generateToken(savedUser._id, 86400);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signinHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = generateToken(userFound._id, 86400);
    const roles = userFound.roles;
    res.json({ token, roles });
  } catch (error) {
    console.log(error);
  }
};

export const forgotPasswordHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateToken(user._id, "1h");

    await sendResetPasswordEmail(user.email, resetToken);

    res.status(200).json({
      message: "Reset password instructions sent to your email",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPasswordHandler = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const userId = decodedToken(token);
    console.log(userId);

    const user = await User.findById({ _id: userId });
    console.log(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: error.message });
  }
};

const decodedToken = (token) => {
  const data = jwt.verify(token, SECRET);
  return data.id;
};

const generateToken = (userId, expiresIn) => {
  const token = jwt.sign({ id: userId }, SECRET, {
    expiresIn: expiresIn,
  });
  return token;
};
