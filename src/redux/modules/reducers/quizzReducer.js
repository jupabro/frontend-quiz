const initState = {
  submittedSelections: null,
  quizzData: null,
  index: 0,
  score: 0,
  completed: false,
}

const SelectionReducer = (state = initState, action) => {
  switch (action.type) {
    case "STORE_SELECTIONS":
      return {
        ...state,
        submittedSelections: action.payload,
      }
    case "STORE_QUIZZ_DATA":
      return {
        ...state,
        quizzData: action.payload,
      }
    case "SET_INDEX":
      return {
        ...state,
        index: action.payload,
      }
    case "SET_SCORE":
      return {
        ...state,
        score: action.payload,
      }
    case "COMPLETED":
      return {
        ...state,
        completed: action.payload,
      }
    default:
      return state
  }
}

export default SelectionReducer
