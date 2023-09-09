export const submitSelections = (category, difficulty, typeValue, amount) => {
  return {
    type: "SUBMIT_SELECTIONS",
    category,
    difficulty,
    typeValue,
    amount,
  }
}
