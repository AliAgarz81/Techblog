const express = require('express');
const http = require('http');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { errorResponserHandler, invalidPathHandler } = require('./middlewares/errorHandler');


const PORT = process.env.PORT || 5001
dbConnect();
app.use(express.static('uploads'));
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/comments', commentRoutes);
app.use(invalidPathHandler);
app.use(errorResponserHandler);


const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));