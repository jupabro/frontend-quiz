import React, { useState, useEffect } from "react"
import SelectionForm from "../components/SelectionForm"
import Icon from "@mdi/react"
import { mdiLoading } from "@mdi/js"

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
    <div className='page-content-container'>
      {!isLoading ? (
        <SelectionForm categories={categories} />
      ) : (
        <Icon className='spinner' path={mdiLoading} size={3} spin={1} />
      )}
    </div>
  )
}

export default SelectionPage
