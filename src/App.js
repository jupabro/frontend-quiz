import "./App.css"
import React, { useState, useEffect } from "react"
// import SearchIcon from "./assets/search.svg"

// const API_URL =
//   "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple"

const App = () => {
  // const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`

    fetch(apiUrl)
      .then((res) => res.json())
      .then((jsonData) => {
        setCategories(jsonData.trivia_categories)
      })
  }, [setCategories])

  const selectCategory = (event) => {
    setCategory(event.target.value)
  }

  return (
    <div className='app'>
      <h1 className='app-title'>QuizzLand</h1>
      <h2>Select Category:</h2>
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
  )
}

export default App
