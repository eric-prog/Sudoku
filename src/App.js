// import logo from './logo.svg';
import { useState } from "react";
import './App.css';


const getInitialGrid = () => {
  return [
    [0, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
}

function App() {
  const [grid, setGrid] = useState(getInitialGrid());

  function setGridValue(row, col, val) {
    const newGrid = [...grid];
    newGrid[row][col] = val;
    setGrid(newGrid)
  }

  function handleClearPuzzle() {
    setGrid([...getInitialGrid()])
  }

  async function handleSolvePuzzle() {
    let puzzleAsString = "";

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
        const value = grid[rowIndex][colIndex]
        puzzleAsString += value === 0 ? "." : value;
      }
    }
    const VALUES = ""
    const response = await fetch ("https://127.0.0.1:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sudoku: [
          VALUES          
        ]
      })
    })
    const jsonData = await response.json()
    const solution = jsonData.data[0].solution;
    // const newGrid = new Array(9).fill(new Array(9).fill(0)) // wrong because it shares reference
    const newGrid = new Array(9).fill("").map(() => new Array(9).fill(0)) 

    for (let rowIndex = 0; rowIndex < newGrid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < newGrid[rowIndex].length; colIndex++) {
        newGrid[rowIndex][colIndex] = parseInt(solution.charAt(rowIndex * 9 + colIndex))
      }
    }

    setGrid(newGrid)
  }

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((number, colIndex) => (
              <div key={colIndex} className="cell">
                <input 
                  value={number}
                  onChange={(e) => setGridValue(rowIndex, colIndex, e.target.value)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => handleSolvePuzzle()}>Solve Puzzle</button>
      <button onClick={() => handleClearPuzzle()}>Clear Puzzle</button>
    </div>
  );
}

export default App;
