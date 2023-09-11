import React, { useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setScore, setIndex } from "../redux/modules/actions"

const Resolution = () => {
  const score = useSelector((state) => state.quizz.score)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const replay = () => {
    dispatch(setScore(0))
    dispatch(setIndex(0))
  }
  const fetch = () => {
    console.log("fetch")
  }
  const settings = useCallback(() => {
    dispatch(setScore(0))
    dispatch(setIndex(0))
  }, [dispatch])

  //   useEffect(() => {
  //     navigate("/")
  //   }, [settings, navigate])

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
