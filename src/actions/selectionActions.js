export const storeSelections = (category, difficulty, typeValue, amount) => {
  return {
    type: "STORE_SELECTIONS",
    category,
    difficulty,
    typeValue,
    amount,
  }
}

export const storeQuizzData = (quizzData) => {
  return {
    type: "STORE_QUIZZ_DATA",
    payload: quizzData,
  }
}
