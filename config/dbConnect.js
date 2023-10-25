const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));
};

module.exports = dbConnect