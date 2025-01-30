const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Health check route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

/*
{
    "email": 'email@domain.com',
    "password": "password"
}
*/
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
app.post("/api/create_user", (req, res) => {
    console.log(req.body);
    if(isValidEmail(req.body.email)) {
        //check if email is already in the json
        //write it to the JSON
        res.send("User created!");
    } else {
        res.send("Invalid email!");
    }
});

app.post("/api/create_recipe", (req, res) => {
    console.log(res.body);
});

app.post("/api/add_product", (req, res) => {
    console.log(res.body);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
