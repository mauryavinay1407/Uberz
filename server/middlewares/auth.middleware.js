const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const BlackListedTokenModel = require('../models/blackListedToken.model');
const captainModel = require('../models/captain.model');


const authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:"Unauthorize access"});
    }

    const isBlacklisted  = await BlackListedTokenModel.findOne({token});
    if(isBlacklisted ){
        return res.status(400).json({message: 'Unauthorize'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorize access'})   
    }
}

const authCaptain = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:"Unauthorize access"});
    }

    const isBlacklisted  = await BlackListedTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(400).json({message: 'Unauthorize'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorize access'})   
    }

}

module.exports = {authUser, authCaptain};