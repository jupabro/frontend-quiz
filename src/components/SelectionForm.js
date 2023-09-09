import React, { useState } from "react"
import options from "../assets/data/options.json"
import SearchIcon from "../assets/search.svg"

const SelectionForm = ({ categories }) => {
  const { difficultyOptions, typeOptions } = options

  const [selections, setselections] = useState({
    category: "",
    difficulty: "",
    type: "",
    amount: 10,
  })

  const handleSelectionChange = (event) => {
    const { name, value } = event.target
    setselections((prevselections) => ({
      ...prevselections,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted")
    let apiUrl = `https://opentdb.com/api.php?amount=${selections.amount}`

    if (selections.category.length) {
      apiUrl = apiUrl.concat(`&category=${selections.category}`)
    }
    if (selections.difficulty.length) {
      apiUrl = apiUrl.concat(`&difficulty=${selections.difficulty}`)
    }
    if (selections.type.length) {
      apiUrl = apiUrl.concat(`&type=${selections.type}`)
    }
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.results)
      })
  }

  return (
    <form onSubmit={handleSubmit} className='selection-form'>
      <div className='selection-body'>
        <label className='selection-label'>Selection Category:</label>
        <select
          name='category'
          value={selections.category}
          onChange={handleSelectionChange}
        >
          <option value=''>All</option>
          {categories &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className='selection-body'>
        <label className='selection-label'>Selection Difficulty:</label>
        <select
          name='difficulty'
          value={selections.difficulty}
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
        <label className='selection-label'>Selection Question Type:</label>
        <select
          name='type'
          value={selections.type}
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
        <label className='selection-label'>Amount of Questions:</label>
        <input
          name='amount'
          type='number'
          value={selections.amount}
          onChange={handleSelectionChange}
        />
      </div>
      <button type='submit' className='search-button'>
        <img src={SearchIcon} alt='Search-img' />
      </button>
    </form>
  )
}

export default SelectionForm
