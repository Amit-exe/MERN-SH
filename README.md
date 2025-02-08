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
   const express = require("express");
   const app = express();
   const port = 3000;

   app.get("/", (req, res) => {
     res.send("Hello World! 🌍");
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
   const express = require("express");
   const router = express.Router();

   router.get("/api/users", (req, res) => {
     res.send("List of Users");
   });

   router.post("/api/users", (req, res) => {
     res.send("User created");
   });

   module.exports = router;
   ```

---

## Step 3: Set Up Database (MongoDB + Mongoose) 🗄️

1. **Connect to MongoDB**: Install `mongoose` and use `mongoose.connect()` to connect to your MongoDB database. For local MongoDB, the URI will look like:
   ```javascript
   mongoose.connect("mongodb://localhost:27017/yourdbname", {
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
   const User = mongoose.model("User", userSchema);
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
     User.findById(req.params.id).then((user) => {
       if (!user) {
         return res.status(404).send("User not found");
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
     res.status(500).send("Something went wrong! 😔");
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
   const jwt = require("jsonwebtoken");

   router.post("/login", (req, res) => {
     const token = jwt.sign({ userId: req.user._id }, "your_jwt_secret");
     res.json({ token });
   });
   ```

3. **Create Middleware for JWT Verification**: Protect routes by verifying JWT tokens. Example:

   ```javascript
   const verifyToken = (req, res, next) => {
     const token = req.headers["authorization"];

     if (!token) {
       return res.status(403).send("Token required");
     }

     jwt.verify(token, "your_jwt_secret", (err, decoded) => {
       if (err) {
         return res.status(401).send("Unauthorized");
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


# API Insights 📊

This Node.js project is a basic RESTful API built with Express, MongoDB, and JWT (JSON Web Tokens) for user authentication. Below is a breakdown of how the code works:

---

## server.js

### **Database Connection** 🌐
This file connects to MongoDB using Mongoose. It reads the MongoDB URI from the config and establishes the connection. If successful, it logs the success message; otherwise, it catches errors and logs them.

### **Routing** 🚦
It imports the `express.js` file (which defines routes) and uses a simple template function to send a response when the home route (`"/"`) is accessed.

### **Server Initialization** ⚡
It starts the Express server, listening on a port defined in the config.

---

## express.js

### **Middlewares** 🔧
This file configures several middlewares for the application:
- **bodyParser**: Parses incoming request bodies and attaches them to `req.body`.
- **cookieParser**: Parses cookies attached to the incoming requests.
- **compress**: Compresses the response data.
- **helmet**: Adds various security-related HTTP headers.
- **cors**: Enables Cross-Origin Resource Sharing for the application.

### **Routing** 🚀
It imports the `user.routes.js` and `auth.routes.js` files and uses them for the API.

### **Error Handling** ⚠️
It catches unauthorized errors and other potential errors, returning appropriate JSON error messages.

---

## user.routes.js & auth.routes.js

These files define routes related to users and authentication. They use Express routers to manage the API routes for users.

- **`/api/users`**: Handles GET and POST requests for listing all users and creating a new user.
- **`/api/users/:userId`**: Handles GET, PUT, and DELETE requests to retrieve, update, or delete a user, with additional authentication checks (`requireSignin` and `hasAuthorization`).

---

## user.controller.js

### **User Operations** 👤
This file handles the actual logic for creating, reading, updating, and deleting users:
- **create**: Creates a new user in the database.
- **userByID**: Loads a user by ID and attaches it to `req.profile`.
- **read**: Sends the user profile in the response.
- **list**: Returns a list of all users.
- **update**: Updates user information (excluding password-related fields).
- **remove**: Deletes a user from the database.

### **Error Handling** 🛑
Uses the `errorHandler` to handle and format MongoDB-related errors.

---

## auth.controller.js

### **Authentication** 🔒
This file handles user sign-in and sign-out using JWT:
- **signin**: Checks if the user exists and if the password matches. If successful, it generates a JWT token and returns it along with the user data.
- **signout**: Clears the JWT token (logs the user out).
- **requireSignin**: A middleware that checks if the user is signed in (valid JWT).
- **hasAuthorization**: A middleware that ensures the logged-in user is authorized to perform the action on the user they are trying to access.

---

## user.model.js

### **Mongoose User Schema** 🔑
This file defines the Mongoose schema for users, including name, email, password, and timestamps. The password field is a virtual property, meaning it doesn't exist in the database but allows you to set and get it.

### **Password Encryption** 🔒
It uses the `crypto` module to hash the password with a salt before storing it in the database.

### **Authentication** ✅
It has an `authenticate` method that checks if the password provided matches the stored hashed password.

---

## dbErrorHandler.js

### **Error Handling** ⚠️
This file handles MongoDB-related errors, particularly for unique constraint violations (e.g., duplicate email) and general validation errors. It returns a human-readable error message for the response.

---

## Flow of Authentication 🔄

1. **Sign Up (POST /api/users)**: The user submits their details, and a new user is created in the database.
2. **Sign In (POST /api/signin)**: The user provides their credentials. If correct, a JWT token is generated, and the user is authenticated.
3. **Accessing User Data (GET /api/users/:userId)**: A request is made to retrieve a user’s data. The JWT token in the request is validated by the `requireSignin` middleware. The user must also be authorized (checked by `hasAuthorization`) to access their profile data.

---

Happy coding! 😎✨
