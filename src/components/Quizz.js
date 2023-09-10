import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { decodeHtml } from "../utils/functions"
import { createSelector } from "@reduxjs/toolkit"

const Quizz = () => {
  const dispatch = useDispatch()

  const storedQuizzData = (state) => state.selection.quizzData
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
  const [options, setOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max)
  }

  useEffect(() => {
    console.log("useefect")
    if (!quizz) {
      return
    }
    let answers = [...quizz.incorrect_answers]
    answers.splice(
      getRandomIndex(quizz.incorrect_answers.length),
      0,
      quizz.correct_answer
    )
    setOptions(answers)
  }, [quizz])

  const handleListItemClick = (event) => {
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
  if (!quizz) {
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
