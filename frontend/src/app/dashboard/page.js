'use client';  // Mark as client-side component

import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter for navigation
import styles from "./page.module.css";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [barcodeData, setBarcodeData] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fetch the JSON file from the /public/database folder
    fetch("/database/recipedb.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading recipes:", error));

    // If there's a barcode in the query params, filter the recipes
    const barcode = searchParams.get("barcode");
    if (barcode) {
      setBarcodeData(barcode);
      filterRecipesByBarcode(barcode);
    }
  }, [searchParams]);

  // Function to filter recipes based on the scanned barcode
  const filterRecipesByBarcode = (barcode) => {
    const results = recipes.filter((recipe) =>
      recipe.recipe.toLowerCase().includes(barcode.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchClick = () => {
    // Redirect to the Barcode scanner with return_url pointing to current page
    router.push(`/barcode?return_url=${encodeURIComponent(window.location.href)}`);
  };

  return (
    <>
      <Head>
        <title>Better Recipes</title>
      </Head>
      <header>
        <h1>Welcome to Better Recipes!</h1>
      </header>
      <main>
        <h3>Email will be here</h3>
        <h2 style={{ marginTop: '2rem' }}>My Recipes</h2> {/* Table title with spacing */}
        
        {/* Buttons - positioned to the right above the table */}
        <div style={{
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '1rem', // Adds space below the buttons
          gap: '10px'
        }}>
          <button 
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            onClick={handleSearchClick}
          >
            Search (Scan Barcode)
          </button>
          <button 
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            onClick={() => console.log("Add Recipe clicked")}
          >
            Add Recipe
          </button>
        </div>
        
        {/* Table */}
        {searchResults.length > 0 ? (
          <div>
            <h3>Search Results:</h3>
            <table style={{ marginTop: '1rem', borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '0.5rem' }}>Recipe</th>
                  <th style={{ border: '1px solid black', padding: '0.5rem' }}>Ingredients</th>
                  <th style={{ border: '1px solid black', padding: '0.5rem' }}>Instruction</th>
                  <th style={{ border: '1px solid black', padding: '0.5rem' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((recipe, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '0.5rem' }}>{recipe.recipe}</td>
                    <td style={{ border: '1px solid black', padding: '0.5rem' }}>{recipe.ingredients}</td>
                    <td style={{ border: '1px solid black', padding: '0.5rem' }}>{recipe.instruction}</td>
                    <td style={{ border: '1px solid black', padding: '0.5rem' }}>{recipe.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table style={{ marginTop: '1rem', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Recipe</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Ingredients</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Instruction</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{recipe.recipe}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{recipe.ingredients}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{recipe.instruction}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{recipe.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

