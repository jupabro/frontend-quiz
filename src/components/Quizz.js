import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectDecodedQuizzData,
  selectCurrentQuizz,
  selectQuizzOptions,
} from "../redux/selectors/quizzSelectors"
import { setCompleted, setIndex, setScore } from "../redux/modules/actions"
import Resolution from "./Resolution"

const Quizz = () => {
  const dispatch = useDispatch()

  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const isCompleted = useSelector((state) => state.quizz.completed)
  const score = useSelector((state) => state.quizz.score)
  console.log("score", score)
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
    <div>
      {isCompleted ? (
        <div>
          <p>Quiz Completed</p>
          <Resolution />
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
