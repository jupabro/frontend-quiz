import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { decodeHtml, getRandomIndex } from "../utils/functions"
import { createSelector } from "@reduxjs/toolkit"

const Quizz = () => {
  const dispatch = useDispatch()

  const storedQuizzData = (state) => state.quizz.quizzData
  const selectQuizzIndex = (state) => state.quizz.index

  const decodeQuizzData = createSelector(storedQuizzData, (quizzData) =>
    quizzData.map((q) => ({
      ...q,
      question: decodeHtml(q.question),
      correct_answer: decodeHtml(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map((a) => decodeHtml(a)),
    }))
  )

  const score = useSelector((state) => state.quizz.score)
  const quizzIndex = useSelector((state) => state.quizz.index)
  const quizzSession = useSelector((state) => decodeQuizzData(state))

  const selectQuizzItem = createSelector(
    decodeQuizzData,
    selectQuizzIndex,
    (data, index) => data[index]
  )
  const quizz = useSelector((state) => selectQuizzItem(state))
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const selectOptions = createSelector(selectQuizzItem, (item) => {
    const answers = [...item.incorrect_answers]
    answers.splice(
      getRandomIndex(item.incorrect_answers.length),
      0,
      item.correct_answer
    )
    return answers
  })

  const options = useSelector((state) => selectOptions(state))

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
          setSelectedAnswer(null)
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
  )
}

export default Quizz