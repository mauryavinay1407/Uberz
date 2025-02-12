const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const { createCaptain } = require("../services/captain.service");
const BlackListedTokenModel = require("../models/blackListedToken.model");

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullname: { firstname, lastname },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType },
  } = req.body;

  const isExist = await captainModel.findOne({ email });

  if (isExist) {
    return res
      .status(400)
      .json({ message: "Captain already exists, try login" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password: hashedPassword,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  const token = captain.generateAuthToken();
  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };
  res.cookie("token", token, options);
  res.status(201).json({ message: "Registered successfully", token, captain });
};

const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid username or password " });
  }

  const isCorrectPassword = await captain.comparePassword(password);

  if (!isCorrectPassword) {
    return res.status(401).json({ message: "Invalid username or password " });
  }

  const token = captain.generateAuthToken();

  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };
  res.cookie("token", token, options);

  return res.status(201).json({ message: "Login successfully", token, captain });
};

const getCaptainProfile = async(req,res) =>{
    return res.status(201).json(req.captain);
}

const logoutCaptain = async(req,res) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await BlackListedTokenModel.create({token});

    res.clearCookie('token');
    return res.status(200).json({message : "Logout successfully"});
}

module.exports = { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain};
