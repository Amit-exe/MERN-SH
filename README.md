# Node.js & Express Setup

## 🚀 Step 1: Setup Node.js & Express
### 📝 Create a New Node.js Project:
- Initialize a new project using:
  ```bash
  npm init -y
Install dependencies like express, mongoose, body-parser, cookie-parser, etc.:
bash
Copy
Edit
npm install express mongoose body-parser cookie-parser
🖥️ Create a Basic Server:
In server.js, set up the server to listen on a port.
Add a simple route (GET /) that sends back a basic response like "Hello World".
js
Copy
Edit
app.get('/', (req, res) => {
  res.send('Hello World');
});
🛠️ Step 2: Configure Middleware & Routes
🧰 Set Up Middleware:
Use body-parser to parse incoming request bodies.
Use cookie-parser for handling cookies.
Enable cors to allow your app to handle requests from different origins.
Add helmet for security:
bash
Copy
Edit
npm install cors helmet
📂 Set Up Routes:
Create separate route files (e.g., auth.routes.js, user.routes.js).
Define routes like:
GET /api/users
POST /api/users
Implement CRUD actions like creating, reading, updating, or deleting users.
📦 Step 3: Set Up Database (MongoDB + Mongoose)
🔗 Connect to MongoDB:
Install mongoose and connect to MongoDB using:
bash
Copy
Edit
npm install mongoose
In your code:
js
Copy
Edit
mongoose.connect('mongodb://localhost:27017/yourdbname');
🏗️ Create Models:
Define models (e.g., User) using Mongoose:
js
Copy
Edit
const User = mongoose.model('User', userSchema);
🧑‍💻 Step 4: Create Controllers
⚙️ Create Logic to Handle Requests:
Define controller functions (e.g., createUser, getUser, updateUser) to handle routes.
Use Mongoose to interact with the database:
js
Copy
Edit
async function createUser(req, res) {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
}
⚠️ Step 5: Error Handling
🛑 Handle Errors Gracefully:
Add error handling middleware to prevent the app from crashing:
js
Copy
Edit
app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Something went wrong!' });
});
🔒 Step 6: Add Authentication
🧑‍💼 JWT Authentication:
Install jsonwebtoken to handle JWT authentication:

bash
Copy
Edit
npm install jsonwebtoken
In auth.routes.js, define a route for login:

js
Copy
Edit
app.post('/login', (req, res) => {
  const token = jwt.sign({ userId: user.id }, 'yourSecretKey');
  res.json({ token });
});
Create middleware to verify JWT on protected routes:

js
Copy
Edit
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');
  jwt.verify(token, 'yourSecretKey', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}
🧪 Step 7: Test Your App
🛠️ Use Postman:
Test your API using Postman or any API testing tool to ensure routes are working.
🔍 Check for Edge Cases:
Test scenarios like:
Fetching a non-existent user.
Accessing a protected route without a valid token.
yaml
Copy
Edit

---

By adding these visuals and breaking it into clear steps with emojis, it’ll be easier to remember and follo
