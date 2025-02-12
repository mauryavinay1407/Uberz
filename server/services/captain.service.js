const captainModel = require("../models/captain.model");


const createCaptain = async({fullname:{firstname, lastname},email,password,vehicle:{
    color,plate,capacity,vehicleType
}}) =>{

    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}

module.exports = {createCaptain};