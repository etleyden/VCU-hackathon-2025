const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = "database/recipedb.json"; // JSON file storing the database

app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies

// Load database from file
const loadDatabase = () => {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
};

// Save database to file
const saveDatabase = (db) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
};

// Get all recipes
app.get("/api/recipes", (req, res) => {
  const db = loadDatabase();
  res.json(db.recipes);
});

// Create a new recipe
app.post("/api/create_recipe", (req, res) => {
  const db = loadDatabase();
  const { product_list, recipe } = req.body;

  if (!product_list || !recipe) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newRecipe = {
    recipe_id: db.recipes.length + 1,
    product_list,
    recipe,
  };

  db.recipes.push(newRecipe);
  saveDatabase(db);
  res.status(201).json(newRecipe);
});

// Create a new product
app.post("/api/create_product", (req, res) => {
  const db = loadDatabase();
  const { upc, name } = req.body;

  if (!upc || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newProduct = { upc, name };
  db.products.push(newProduct);
  saveDatabase(db);
  res.status(201).json(newProduct);
});

// Create a new user
app.post("/api/create_user", (req, res) => {
  const db = loadDatabase();
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (db.users.some((user) => user.username === username || user.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { username, email, password, recipe_list: [] };
  db.users.push(newUser);
  saveDatabase(db);
  res.status(201).json({ message: "User created successfully" });
});

// Log in a user (plaintext password for now)
app.post("/api/login", (req, res) => {
  const db = loadDatabase();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user = db.users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.json({ message: "Login successful", user });
});

// Find recipes containing a product (by UPC)
app.get("/api/recipes/by-product/:upc", (req, res) => {
  const db = loadDatabase();
  const upc = parseInt(req.params.upc, 10);

  const matchingRecipes = db.recipes.filter((recipe) => recipe.product_list.includes(upc));

  res.json(matchingRecipes);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
