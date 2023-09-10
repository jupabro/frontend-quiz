import { createSelector } from "@reduxjs/toolkit"
import { decodeHtml, getRandomIndex } from "../../utils/functions"

const selectQuizzData = (state) => state.quizz.quizzData
const selectQuizzIndex = (state) => state.quizz.index

export const selectDecodedQuizzData = createSelector(
  selectQuizzData,
  (quizzData) =>
    quizzData.map((q) => ({
      ...q,
      question: decodeHtml(q.question),
      correct_answer: decodeHtml(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map((a) => decodeHtml(a)),
    }))
)

export const selectCurrentQuizz = createSelector(
  selectDecodedQuizzData,
  selectQuizzIndex,
  (quizzData, index) => quizzData[index]
)

export const selectQuizzOptions = createSelector(
  selectCurrentQuizz,
  (quizz) => {
    const answers = [...quizz.incorrect_answers]
    answers.splice(
      getRandomIndex(quizz.incorrect_answers.length),
      0,
      quizz.correct_answer
    )
    return answers
  }
)
