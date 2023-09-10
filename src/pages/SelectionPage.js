import React, { useState, useEffect } from "react"
import SelectionForm from "../components/SelectionForm"

const SelectionPage = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`
    fetch(apiUrl)
      .then((res) => res.json())
      .then((jsonData) => {
        setCategories(jsonData.trivia_categories)
        setIsLoading(false)
      })
  }, [setCategories])

  return (
    <div className='selection-container'>
      {!isLoading ? (
        <SelectionForm categories={categories} />
      ) : (
        <p className='loading'>LOADING...</p>
      )}
    </div>
  )
}

export default SelectionPage
