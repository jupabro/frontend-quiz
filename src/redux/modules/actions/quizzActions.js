export const setIndex = (index) => {
  return {
    type: "SET_INDEX",
    payload: index,
  }
}

export const setScore = (score) => {
  return {
    type: "SET_SCORE",
    payload: score,
  }
}

export const storeSelections = (selections) => {
  return {
    type: "STORE_SELECTIONS",
    payload: selections,
  }
}

export const storeQuizzData = (quizzData) => {
  return {
    type: "STORE_QUIZZ_DATA",
    payload: quizzData,
  }
}

export const setCompleted = (boolean) => {
  return {
    type: "COMPLETED",
    payload: boolean,
  }
}
