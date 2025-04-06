const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const { createUser } = require("../services/user.service");
const BlackListedTokenModel = require("../models/blackListedToken.model");

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

  const isExist = await userModel.findOne({ email });

  if (isExist) {
    return res.status(400).json({ message: "User already exists, try login" });
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
//   res.clearCookie("token");
  const token = user.generateAuthToken();
  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };
  res.cookie("token", token, options);
  res.status(201).json({ message: "Registered successfully", token, user });
}

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

  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };
  res.cookie("token", token, options);

  return res.status(200).json({ message: "Login successfully", token, user });
}

const getUserProfile = async(req,res)=>{
    return res.status(201).json(req.user);
}

const logoutUser = async(req,res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await BlackListedTokenModel.create({token});

    res.clearCookie('token');
    res.status(200).json({message: "Logout successfully"});
}

module.exports = { registerUser, loginUser,getUserProfile,logoutUser};
