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
import { fetchQuizData } from "../services/apiService"

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
    <div>
      <h3>Final Score: {score}</h3>
      <button onClick={replay}>Play again!</button>
      <button onClick={fetch}>
        Play again with new questions, same settings
      </button>
      <button onClick={settings}>Back to settings</button>
    </div>
  )
}

export default Resolution
