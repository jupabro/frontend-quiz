import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const Quizz = () => {
  const dispatch = useDispatch()

  const decodeHtml = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html")
    return doc.documentElement.textContent
  }

  const quizzData = useSelector((state) => {
    const encodedQuizz = state.selection.quizzData
    return encodedQuizz.map((q) => {
      return {
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHtml(a)),
      }
    })
  })

  const score = useSelector((state) => state.quizz.score)
  const quizzIndex = useSelector((state) => state.quizz.index)
  const quizz = quizzData[quizzIndex]

  const [options, setOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max)
  }
  useEffect(() => {
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
    if (quizzIndex + 1 <= quizz.length) {
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
        Score: {score} / {quizzData.length}
      </div>
    </div>
  )
}

export default Quizz
