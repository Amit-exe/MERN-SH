
# Node.js & Express API Setup Guide 🚀

This guide will walk you through setting up a Node.js and Express API with MongoDB, Mongoose, and JWT authentication. Follow the steps below to build your project! 🛠️

---

## Step 1: Setup Node.js & Express 🛠️
1. **Create a New Node.js Project**: Run `npm init -y` and install dependencies like `express`, `mongoose`, `body-parser`, `cookie-parser`, `cors`, and `helmet` using:
   ```bash
   npm install express mongoose body-parser cookie-parser cors helmet
   ```
2. **Create a Basic Server**: In `server.js`, set up the server to listen on a port and add a simple route (e.g., `GET /`) that sends back a response like `"Hello World! 🌍"`.
   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;

   app.get('/', (req, res) => {
       res.send('Hello World! 🌍');
   });

   app.listen(port, () => {
       console.log(`Server running on port ${port}`);
   });
   ```

---

## Step 2: Configure Middleware & Routes 🔧
1. **Set Up Middleware**: Use `body-parser` to parse request bodies, `cookie-parser` for handling cookies, `cors` to allow cross-origin requests, and `helmet` for security.
   ```javascript
   app.use(bodyParser.json());
   app.use(cookieParser());
   app.use(cors());
   app.use(helmet());
   ```
2. **Set Up Routes**: Create separate route files (e.g., `auth.routes.js`, `user.routes.js`) and define routes like `GET /api/users` or `POST /api/users`. Each route should handle basic CRUD operations.
   Example for `user.routes.js`:
   ```javascript
   const express = require('express');
   const router = express.Router();

   router.get('/api/users', (req, res) => {
       res.send('List of Users');
   });

   router.post('/api/users', (req, res) => {
       res.send('User created');
   });

   module.exports = router;
   ```

---

## Step 3: Set Up Database (MongoDB + Mongoose) 🗄️
1. **Connect to MongoDB**: Install `mongoose` and use `mongoose.connect()` to connect to your MongoDB database. For local MongoDB, the URI will look like:
   ```javascript
   mongoose.connect('mongodb://localhost:27017/yourdbname', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   });
   ```
2. **Create Models**: Use Mongoose to define models (e.g., `User`) that represent your data structure. For example:
   ```javascript
   const userSchema = new mongoose.Schema({
       name: String,
       email: String,
   });
   const User = mongoose.model('User', userSchema);
   ```

---

## Step 4: Create Controllers 🧑‍💻
1. **Create Logic to Handle Requests**: Define controller functions for actions like `createUser`, `getUser`, `updateUser`, which interact with the database and handle incoming requests. Example:
   ```javascript
   const createUser = (req, res) => {
       const user = new User(req.body);
       user.save().then(() => res.status(201).send(user));
   };

   const getUser = (req, res) => {
       User.findById(req.params.id).then(user => {
           if (!user) {
               return res.status(404).send('User not found');
           }
           res.send(user);
       });
   };
   ```

---

## Step 5: Error Handling ⚠️
1. **Handle Errors Gracefully**: Add error handling middleware to ensure the app doesn’t crash when something goes wrong. Example:
   ```javascript
   app.use((err, req, res, next) => {
       console.error(err);
       res.status(500).send('Something went wrong! 😔');
   });
   ```

---

## Step 6: Add Authentication 🔐
1. **JWT Authentication**: Install `jsonwebtoken`:
   ```bash
   npm install jsonwebtoken
   ```
2. **Set Up Routes for Login**: Define a login route that will authenticate the user and return a JWT token:
   ```javascript
   const jwt = require('jsonwebtoken');

   router.post('/login', (req, res) => {
       const token = jwt.sign({ userId: req.user._id }, 'your_jwt_secret');
       res.json({ token });
   });
   ```
3. **Create Middleware for JWT Verification**: Protect routes by verifying JWT tokens. Example:
   ```javascript
   const verifyToken = (req, res, next) => {
       const token = req.headers['authorization'];

       if (!token) {
           return res.status(403).send('Token required');
       }

       jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
           if (err) {
               return res.status(401).send('Unauthorized');
           }
           req.user = decoded;
           next();
       });
   };
   ```

---

## Step 7: Test Your App 🧪
1. **Use Postman**: Test your API using Postman or any other API testing tool to ensure all routes are functioning as expected.
2. **Check for Edge Cases**: Test edge cases like:
   - Trying to fetch a non-existent user.
   - Accessing protected routes without a token.

---

Happy coding! 😎✨
