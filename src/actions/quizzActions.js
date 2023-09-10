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
