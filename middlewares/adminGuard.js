const authGuard = require('./authGuard');

const adminGuard = (req,res,next) => {
    authGuard(req,res,() => {
        if(req.user.isAdmin){
            next();
        } else{
            res.status(403).json('You are not allowed to do that')
        }
    })
};

module.exports = adminGuard;