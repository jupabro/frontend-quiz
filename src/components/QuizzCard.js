import React from "react"

const QuizzCard = ({
  category,
  type,
  difficulty,
  question,
  correct_answer,
  incorrect_answers,
}) => {
  console.log("card", incorrect_answers)
  return (
    <div className='quizz'>
      <div>
        <p>hello</p>
      </div>

      <div>
        <h1>hello</h1>
      </div>

      <div>
        <span>{correct_answer}</span>
        <h3>{question}</h3>
      </div>
    </div>
  )
}

export default QuizzCard
