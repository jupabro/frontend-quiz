import "./App.css"
import React, { useState, useEffect } from "react"
import otherOptions from "./assets/data/options.json"
// import SearchIcon from "./assets/search.svg"

// const API_URL =
//   "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple"

const App = () => {
  // const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const { difficultyOptions, typeOptions } = otherOptions
  const [isLoading, setIsLoading] = useState(true)

  const [options, setOptions] = useState({
    category: "",
    difficulty: "",
    type: "",
    amount: 10,
  })

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

  const handleSelectionChange = (event) => {
    const { name, value } = event.target
    console.log(event.target.value)
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }))
  }

  return (
    <div className='app-container'>
      <h1 className='app-title'>QuizzLand</h1>
      <div className='selection-container'>
        {!isLoading ? (
          <>
            <div className='selection-body'>
              <h2 className='selection-title'>Select Category:</h2>
              <select
                name='category'
                value={options.category}
                onChange={handleSelectionChange}
              >
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
              <select
                name='difficulty'
                value={options.difficulty}
                onChange={handleSelectionChange}
              >
                {difficultyOptions.map((option) => (
                  <option value={option.value} key={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='selection-body'>
              <h2 className='selection-title'>Select Question Type:</h2>
              <select
                name='type'
                value={options.type}
                onChange={handleSelectionChange}
              >
                {typeOptions.map((option) => (
                  <option value={option.value} key={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='selection-body'>
              <h2 className='selection-title'>Amount of Questions:</h2>
              <input
                name='amount'
                type='number'
                value={options.amount}
                onChange={handleSelectionChange}
              />
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
