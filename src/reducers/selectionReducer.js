const initState = {
  submittedSelections: {
    category: "",
    difficulty: "",
    typeValue: "",
    amount: 0,
  },
}

const SelectionReducer = (state = initState, action) => {
  switch (action.type) {
    case "SUBMIT_SELECTIONS":
      return {
        ...state,
        submittedSelections: {
          category: action.category,
          difficulty: action.difficulty,
          typeValue: action.typeValue,
          amount: action.amount,
        },
      }
    default:
      return state
  }
}

export default SelectionReducer
