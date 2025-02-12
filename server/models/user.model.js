const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname : {
        firstname:{
            type:String,
            required: true,
            minlength: [3,'First name must be at least 3 characters'],
        },
        lastname:{
            type:String,
            minlength: [3,'Last name must be at least 3 characters'],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength : [5,'Email must be at least 5 characters'],
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String
    }
})

// it is methods because it is tied to a specific document
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}
// it is statics because it is not tied to a specific document
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10); 
}

// it is methods because it is tied to a specific document
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;