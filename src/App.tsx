import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [catFactArray, setCatFactArray] = useState<string[]>([]);

  function getCatFacts() {
    fetch("https://meowfacts.herokuapp.com/?count=10")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCatFactArray(data.data);
        // const factsArray = Object.values(data.data) as string[];
        // setCatFactArray(factsArray);
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
