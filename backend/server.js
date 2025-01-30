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

app.post("/api/create_user", (req, res) => {

});

app.post("/api/create_recipe", (req, res) => {

});

app.post("/api/add_product", (req, res) => {

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
