const User = require("../models/User");

const registerUser = async (req,res, next) => {
    try{
        const { name, email, password } = req.body;
        let user = await User.findOne({email});
        if(user) {
            throw new Error('User have already registered')
        }
        user = await User.create({
            name,
            email,
            password
        });
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }catch(error){
        next(error)
    }
};

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error("Credentials cant be blank");
        }
        let user = await User.findOne({ email });
        let token = await user.generateJWT()
        if(!user) {
           throw new Error('Email not found') 
        };
        if(await user.comparePassword(password)){
            return res.cookie('token',token, {maxAge: 604800000,httpOnly: true}).status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token
            })
        }
        else {
            throw new Error('Invalid email or password')
        }
    }catch(error) {
        next(error)
    }
};

const logoutUser = async (req,res,next) => {
    try {
        res.clearCookie('token', {
           sameSite: 'none',
           secure: true, 
        }).status(200).json("User has been logged out")
    }catch(error){
        next(error);
    }
}

const userProfile = async (req,res,next) => {
    try {
        let user = await User.findById(req.user._id);
        if(user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            }) 
        } else {
            let error = new Error("User not found");
            error.statusCode = 404;
            next(error)
        }
    } catch(error){
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (name && name !== req.user?.name) {
            const usernameExists = await User.findOne({ name });
            if (usernameExists) {
                return res.status(400).json({ message: 'Username is already in use.' });
            }
        }
        if (email && email !== req.user?.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email is already in use.' });
            }
        }
        const updatedUser = await User.findByIdAndUpdate(req.user?._id, { $set: req.body }, { new: true });
        if (updatedUser) {
            return res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            });
        } else {
            let error = new Error('User not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        if (!req.user) {
            let error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }
        await User.findByIdAndDelete(req.user._id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser, userProfile, updateUser, deleteUser, logoutUser }