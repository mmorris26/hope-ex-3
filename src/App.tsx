import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [catFactArray, setCatFactArray] = useState<string[]>([]);

  function getCatFacts() {
    fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=1d11e1e9&app_key=a0a011287d9011f1443c97fecb290044"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.hits);
        // setCatFactArray(data.hits);
      });
  }

  return (
    <div className="App">
      <button onClick={getCatFacts}>Get Facts</button>
      {catFactArray.map((fact, index) => (
        <p key={index}>{fact}</p>
      ))}
    </div>
  );
}

export default App;
