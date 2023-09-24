import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  selectDecodedQuizzData,
  selectCurrentQuizz,
  selectQuizzOptions,
} from "../redux/selectors/quizzSelectors"
import { setCompleted, setIndex, setScore } from "../redux/modules/actions"
import { getOptionLabel, getCategoryName } from "../utils/functions"

const QuizzCard = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const categories = location.state.categories
  const difficultyOptions = location.state.difficultyOptions
  const typeOptions = location.state.typeOptions

  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const storedSubmittedSelections = useSelector(
    (state) => state.quizz.submittedSelections
  )

  const categoryName = getCategoryName(
    categories,
    storedSubmittedSelections.categoryId
  )
  const difficultyOption = getOptionLabel(
    difficultyOptions,
    storedSubmittedSelections.difficulty
  )

  const typeOption = getOptionLabel(typeOptions, storedSubmittedSelections.type)

  const score = useSelector((state) => state.quizz.score)
  const quizzIndex = useSelector((state) => state.quizz.index)
  const quizzSession = useSelector((state) => selectDecodedQuizzData(state))
  const quizz = useSelector((state) => selectCurrentQuizz(state))
  const options = useSelector((state) => selectQuizzOptions(state))

  const handleListItemClick = (event) => {
    if (!selectedAnswer) {
      setSelectedAnswer(event.target.textContent)
      if (event.target.textContent === quizz.correct_answer) {
        dispatch(setScore(score + 1))
      }
      if (quizzIndex + 1 < quizzSession.length) {
        setTimeout(() => {
          setSelectedAnswer(null)
          dispatch(setIndex(quizzIndex + 1))
        }, 2500)
      } else {
        setTimeout(() => {
          setSelectedAnswer(null)
          dispatch(setCompleted(true))
        }, 2500)
      }
    }
  }
  const getClass = (option) => {
    if (!selectedAnswer) {
      return ``
    }
    if (option === quizz.correct_answer) {
      return `correct`
    }
    if (option === selectedAnswer) {
      return `selected`
    }
  }

  if (!quizz && !options) {
    return <div>LOADING...</div>
  }

  return (
    <div className='selection-form'>
      <h3 className='selection-question'>{quizz.question}</h3>
      <div className='selection-label selection-description'>
        <span>Category: {categoryName}</span>
        <span>Difficulty: {difficultyOption}</span>
        <span>Type: {typeOption}</span>
      </div>
      <ul className='selection-body'>
        {options.map((option, i) => (
          <li
            key={i}
            onClick={handleListItemClick}
            className={getClass(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <div className='selection-label'>
        <span>Question {quizzIndex + 1} </span>
        <span>
          Score: {score} / {quizzSession.length}
        </span>
      </div>
    </div>
  )
}

export default QuizzCard
