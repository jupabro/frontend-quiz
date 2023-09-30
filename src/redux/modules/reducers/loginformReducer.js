const initialState = {
  isOpen: false,
  activeTab: "login",
}

const loginFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_FORM":
      return { ...state, isOpen: true }
    case "CLOSE_LOGIN_FORM":
      return { ...state, isOpen: false }
    case "SWITCH_LOGIN_FORM_TAB":
      return { ...state, activeTab: action.payload }
    default:
      return state
  }
}

export default loginFormReducer
