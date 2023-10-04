import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  setScore,
  setIndex,
  setCompleted,
  storeSelections,
  storeQuizzData,
} from "../redux/modules/actions"
import { useNavigate } from "react-router-dom"
import { fetchQuizData } from "../services/api/extern-api"

const Resolution = () => {
  const score = useSelector((state) => state.quizz.score)

  const storedSubmittedSelections = useSelector(
    (state) => state.quizz.submittedSelections
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const replay = () => {
    dispatch(setScore(0))
    dispatch(setIndex(0))
    dispatch(setCompleted(false))
  }

  const fetch = async () => {
    console.log("fetching", storedSubmittedSelections)
    try {
      const quizzData = await fetchQuizData(storedSubmittedSelections)
      dispatch(storeQuizzData(quizzData))
    } catch (error) {
      console.error(error)
    }
    dispatch(setScore(0))
    dispatch(setIndex(0))
    dispatch(setCompleted(false))
  }

  const settings = () => {
    dispatch(storeQuizzData(null))
    dispatch(storeSelections(null))
    dispatch(setCompleted(false))
    dispatch(setScore(0))
    dispatch(setIndex(0))
    navigate("/")
  }

  return (
    <div className='selection-form'>
      <h2 className='selection-title'>Quizz-session completed</h2>
      <h3 className='selection-question'>
        Final Score: {score} / {storedSubmittedSelections.amount}
      </h3>
      <div className='selection-body'>
        <button className='selection-question' onClick={replay}>
          Repeat the session!
        </button>
        <button onClick={fetch}>Repeat: new questions, same setting!</button>
        <button onClick={settings}>Go to settings</button>
      </div>
    </div>
  )
}

export default Resolution
