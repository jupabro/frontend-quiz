import React, { useState } from "react"
import otherOptions from "../assets/data/options.json"
// import SearchIcon from "./assets/search.svg"

const SelectionForm = ({ categories }) => {
  // const [searchTerm, setSearchTerm] = useState("")
  const { difficultyOptions, typeOptions } = otherOptions

  const [options, setOptions] = useState({
    category: "",
    difficulty: "",
    type: "",
    amount: 10,
  })

  const handleSelectionChange = (event) => {
    const { name, value } = event.target
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }))
  }

  return (
    <div>
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
    </div>
  )
}

export default SelectionForm
