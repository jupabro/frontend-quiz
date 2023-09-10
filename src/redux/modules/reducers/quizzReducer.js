const initState = {
  submittedSelections: {
    category: "",
    difficulty: "",
    typeValue: "",
    amount: 0,
  },
  quizzData: null,
  index: 0,
  score: 0,
}

const SelectionReducer = (state = initState, action) => {
  switch (action.type) {
    case "STORE_SELECTIONS":
      return {
        ...state,
        submittedSelections: {
          category: action.category,
          difficulty: action.difficulty,
          typeValue: action.typeValue,
          amount: action.amount,
        },
      }
    case "STORE_QUIZZ_DATA":
      return {
        ...state,
        quizzData: action.payload,
      }
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

export default SelectionReducer
