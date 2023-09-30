import { combineReducers } from "redux"
import quizzReducer from "./quizzReducer"
import loginFormReducer from "./loginformReducer"

const rootReducer = combineReducers({
  quizz: quizzReducer,
  loginForm: loginFormReducer
})

export default rootReducer
