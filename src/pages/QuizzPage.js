import React from "react"
import { useSelector } from "react-redux"
import Resolution from "../components/Resolution"
import QuizzCard from "../components/QuizzCard"

const Quizz = () => {
  const isCompleted = useSelector((state) => state.quizz.completed)

  return (
    <div className='page-content-container'>
      {isCompleted ? (
        <>
          <Resolution />
        </>
      ) : (
        <>
          <QuizzCard />
        </>
      )}
    </div>
  )
}

export default Quizz
