import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  type Recipe = {
    name: string;
    image: string;
    cuisine: string;
  };

  type RecipeHit = {
    recipe: {
      label: string;
      image: string;
      cuisineType?: string;
    };
  };

  const [recipeArray, setRecipeArray] = useState<Recipe[]>([]);

  const [newRecipeName, setNewRecipeName] = useState<string>("");
  const [newRecipeCuisine, setNewRecipeCuisine] = useState<string>("");
  const [newRecipeImage, setNewRecipeImage] = useState<string>("");

  function getRecipes() {
    fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=1d11e1e9&app_key=a0a011287d9011f1443c97fecb290044"
    )
      .then((response) => response.json())
      .then((data) => {
        const newRecipes = data.hits.map((hit: RecipeHit) => ({
          name: hit.recipe.label,
          image: hit.recipe.image,
          cuisine: hit.recipe.cuisineType || "Unknown",
        }));
        setRecipeArray(newRecipes);
      });
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const sortType = event.target.value;

    let sortedRecipes = [...recipeArray];

    switch (sortType) {
      case "name-asc":
        sortedRecipes.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedRecipes.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "cuisine-asc":
        sortedRecipes.sort((a, b) => a.cuisine.localeCompare(b.cuisine));
        break;
      case "cuisine-desc":
        sortedRecipes.sort((a, b) => b.cuisine.localeCompare(a.cuisine));
        break;
      default:
        break;
    }

    setRecipeArray(sortedRecipes);
  }

  function handleAddRecipe(event: React.FormEvent) {
    event.preventDefault();

    const newRecipe: Recipe = {
      name: newRecipeName,
      cuisine: newRecipeCuisine,
      image: newRecipeImage,
    };
    setRecipeArray([...recipeArray, newRecipe]);

    setNewRecipeName("");
    setNewRecipeCuisine("");
    setNewRecipeImage("");
  }

  return (
    <div className="App">
      <button className="button" onClick={getRecipes}>
        Get Recipes
      </button>
      <div className="select-container">
        <select onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="cuisine-asc">Cuisine (A-Z)</option>
          <option value="cuisine-desc">Cuisine (Z-A)</option>
        </select>
      </div>
      <div>
        <div className="form-container">
          <form onSubmit={handleAddRecipe}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Cuisine:</label>
              <input
                type="text"
                value={newRecipeCuisine}
                onChange={(e) => setNewRecipeCuisine(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Image URL:</label>
              <input
                type="url"
                value={newRecipeImage}
                onChange={(e) => setNewRecipeImage(e.target.value)}
                required
              />
            </div>

            <button className="button" type="submit">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
      <div className="recipe-grid">
        {recipeArray.map((recipe, index) => (
          <div key={index} className="recipe">
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} />
            <p>Cuisine: {recipe.cuisine}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
