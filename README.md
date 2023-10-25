# Techblog
MERN Stack Blog App
Using technologies: ExpressJs (Main backend framework), Mongoose(Connecting database), Bcrypt(hash password), Multer(image uploading), Helmet, Mongo-Sanitizer (security middlewares), 
Cors (for CORS policy to connect frontend to backend), JsonWebToken (Token sign algorithm for users), Dotenv(reading .env file), Cookie-parser (Creating and saving cookies).  

Type "npm install" on command line for install dependency first.
Then create .env file which contain environment variables like MONGO_URL, JWT_TOKEN, PORT etc.
For ex:
PORT = 5000
JWT_TOKEN = anystring
MONGO_URL = mongodb+srv://(username here):(password here)@cluster0.xsqjx5m.mongodb.net/(Db name here)?retryWrites=true&w=majority
NODE_ENV = development

Type "npm run dev" on command line for starting development environment.
