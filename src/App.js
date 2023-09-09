import "./App.css"
import React, { useState, useEffect } from "react"
import options from "./assets/data/options.json"
// import SearchIcon from "./assets/search.svg"

// const API_URL =
//   "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple"

const App = () => {
  // const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const { difficultyOptions, typeOptions } = options
  const [isLoading, setIsLoading] = useState(true)

  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [type, setType] = useState("")
  const [number, setNumber] = useState(10)

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`
    setIsLoading(true)

    fetch(apiUrl)
      .then((res) => res.json())
      .then((jsonData) => {
        setCategories(jsonData.trivia_categories)
      })
      .then(setIsLoading(false))
  }, [setCategories])

  const selectCategory = (event) => {
    setCategory(event.target.value)
  }
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value)
  }
  const handleTypeChange = (event) => {
    setType(event.target.value)
  }
  const handleAmountChange = (event) => {
    setNumber(event.target.value)
  }

  return (
    <div className='app-container'>
      <h1 className='app-title'>QuizzLand</h1>
      <div className='selection-container'>
        {!isLoading ? (
          <>
            <div className='selection-body'>
              <h2 className='selection-title'>Select Category:</h2>
              <select value={category} onChange={selectCategory}>
                <option>All</option>
                {categories &&
                  categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='selection-body'>
              <h2 className='selection-title'>Select Difficulty:</h2>
              <select value={difficulty} onChange={handleDifficultyChange}>
                {difficultyOptions.map((option) => (
                  <option value={option.value} key={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='selection-body'>
              <h2 className='selection-title'>Select Question Type:</h2>
              <select value={type} onChange={handleTypeChange}>
                {typeOptions.map((option) => (
                  <option value={option.value} key={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='selection-body'>
              <h2 className='selection-title'>Amount of Questions:</h2>
              <input value={number} onChange={handleAmountChange} />
            </div>
          </>
        ) : (
          <p className='loading'>LOADING...</p>
        )}
      </div>
    </div>
  )
}

export default App
