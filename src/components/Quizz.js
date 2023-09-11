import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  selectDecodedQuizzData,
  selectCurrentQuizz,
  selectQuizzOptions,
} from "../redux/selectors/quizzSelectors"

const Quizz = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const score = useSelector((state) => state.quizz.score)
  const quizzIndex = useSelector((state) => state.quizz.index)
  const quizzSession = useSelector((state) => selectDecodedQuizzData(state))
  const quizz = useSelector((state) => selectCurrentQuizz(state))
  const options = useSelector((state) => selectQuizzOptions(state))

  const handleListItemClick = (event) => {
    if (!selectedAnswer) {
      setSelectedAnswer(event.target.textContent)
      if (event.target.textContent === quizz.correct_answer) {
        dispatch({
          type: "SET_SCORE",
          score: score + 1,
        })
      }
      if (quizzIndex + 1 < quizzSession.length) {
        setTimeout(() => {
          setSelectedAnswer(null)
          dispatch({
            type: "SET_INDEX",
            index: quizzIndex + 1,
          })
        }, 2500)
      } else {
        setTimeout(() => {
          setQuizCompleted(true)
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
    <div>
      {quizCompleted ? (
        <div>
          <p>Quiz Completed</p>
          <button onClick={() => navigate("/resolution")}>
            View Resolution
          </button>
        </div>
      ) : (
        <div>
          <p>Question {quizzIndex + 1}</p>
          <h3>{quizz.question}</h3>
          <ul>
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
          <div>
            Score: {score} / {quizzSession.length}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quizz
