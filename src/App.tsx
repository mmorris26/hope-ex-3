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

  return (
    <div className="App">
      <button onClick={getRecipes}>Get Recipes</button>
      {recipeArray.map((recipe, index) => (
        <div key={index} className="recipe">
          <h2>{recipe.name}</h2>
          <img src={recipe.image} alt={recipe.name} />
          <p>Cuisine: {recipe.cuisine}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
