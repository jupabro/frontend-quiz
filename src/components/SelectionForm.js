import React, { useState } from "react"
import options from "../assets/data/options.json"
import SearchIcon from "../assets/search.svg"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { submitSelections } from "../actions"

const SelectionForm = ({ categories }) => {
  const { difficultyOptions, typeOptions } = options
  const dispatch = useDispatch()

  const storedSubmittedSelections = useSelector(
    (state) => state.selection.submittedSelections
  ) // Changed variable name to avoid conflict

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
    event.preventDefault()

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
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()

      if (data.results && data.results.length > 0) {
        const { category, type, difficulty } = data.results[0]
        const amount = data.results.length
        dispatch(submitSelections(category, difficulty, type, amount))
        console.log(data.results)
        console.log("storedSubmittedSelections", storedSubmittedSelections)
      } else {
        console.log("No questions found in the response.")
      }
    } catch (error) {
      console.error("An error occurred while fetching the data:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='selection-form'>
      <h2 className='selection-title'>Configure your Quizz-Session</h2>
      <div className='selection-body'>
        <label className='selection-label'>Category:</label>
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
        <label className='selection-label'>Difficulty:</label>
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
        <label className='selection-label'>Type:</label>
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
        <label className='selection-label'>Amount</label>
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
