const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const { createUser } = require("../services/user.service");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullname: { firstname, lastname },
    email,
    password,
  } = req.body;

  const isExists = await userModel.findOne({ email });

  if (isExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();

  res.status(201).json({ message: "Registered successfully", token, user });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password " });
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    return res.status(401).json({ message: "Invalid username or password " });
  }

  const token = user.generateAuthToken();

  return res.status(201).json({ message: "Login successfully", token, user });
};

module.exports = { registerUser, loginUser };
