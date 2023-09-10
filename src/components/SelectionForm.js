import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import options from "../assets/data/options.json"
import SearchIcon from "../assets/search.svg"
import { useDispatch, useSelector } from "react-redux"
import { storeSelections, storeQuizzData } from "../redux/modules/actions"

const SelectionForm = ({ categories }) => {
  const { difficultyOptions, typeOptions } = options
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const storedSubmittedSelections = useSelector(
    (state) => state.quizz.submittedSelections
  )

  const storedQuizzData = useSelector((state) => state.quizz.quizzData)

  const [selections, setselections] = useState({
    categoryId: "",
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

  const getOptionLabel = (options, value) => {
    const selectedOption = options.find((option) => option.value === value)
    return selectedOption ? selectedOption.label : ""
  }

  const getCategoryName = (categories, categoryId) => {
    console.log(categories, selections.categoryId)
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(categoryId, 10)
    )
    return selectedCategory ? selectedCategory.name : "All"
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(selections)

    let apiUrl = `https://opentdb.com/api.php?amount=${selections.amount}`

    if (selections.categoryId.length) {
      apiUrl = apiUrl.concat(`&category=${selections.categoryId}`)
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
        const quizzData = data.results
        const amount = data.results.length
        dispatch(
          storeSelections(
            getCategoryName(categories, selections.categoryId),
            getOptionLabel(difficultyOptions, selections.difficulty),
            getOptionLabel(typeOptions, selections.type),
            amount
          )
        )
        dispatch(storeQuizzData(quizzData))
        console.log("storedSubmittedSelections", storedSubmittedSelections)
        console.log("storedQuizzData", storedQuizzData)

        if (storedQuizzData) {
          navigate("/quizz")
        }
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
          name='categoryId'
          value={selections.categoryId}
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
