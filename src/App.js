import React, { useState, useEffect } from "react"
import "./App.css"
import SelectionForm from "./components/SelectionForm"

const App = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <div className='app-container'>
      <h1 className='app-title'>QuizzLand</h1>
      <div className='selection-container'>
        {!isLoading ? <SelectionForm categories={categories}/> : <p className='loading'>LOADING...</p>}
      </div>
    </div>
  )
}

export default App
