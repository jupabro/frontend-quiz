import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import options from "../assets/data/options.json"
import SearchIcon from "../assets/search.svg"
import { fetchQuizData } from "../services/api/extern-api/quiz-api"
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

  useEffect(() => {
    if (storedQuizzData) {
      const data = {
        categories,
        difficultyOptions,
        typeOptions,
      }
      navigate("/quizz", { state: data })
      console.log("storedSubmittedSelections", storedSubmittedSelections)
      console.log("storedQuizzData", storedQuizzData)
    }
  }, [
    storedQuizzData,
    storedSubmittedSelections,
    navigate,
    categories,
    difficultyOptions,
    typeOptions,
  ])

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const quizzData = await fetchQuizData(selections)
      // const amount = quizzData.length
      dispatch(storeSelections(selections))
      dispatch(storeQuizzData(quizzData))
    } catch (error) {
      console.error(error)
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
