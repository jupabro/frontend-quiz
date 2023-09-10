const initState = {
  submittedSelections: {
    category: "",
    difficulty: "",
    typeValue: "",
    amount: 0,
  },
  quizzData: null,
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
    default:
      return state
  }
}

export default SelectionReducer
