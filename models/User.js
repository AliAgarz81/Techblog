const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{ timestamps:true });

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10)
        return next()
    }
    return next()
});

userSchema.methods.generateJWT = async function() {
    return await jwt.sign({id: this._id}, process.env.JWT_TOKEN, {expiresIn: '7d'})
}
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);