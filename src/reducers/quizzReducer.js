const initState = {
  index: 0,
  score: 0,
}

const QuizzReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_INDEX":
      return {
        ...state,
        index: action.index,
      }

    case "SET_SCORE":
      return {
        ...state,
        score: action.score,
      }
    default:
      return state
  }
}

export default QuizzReducer
