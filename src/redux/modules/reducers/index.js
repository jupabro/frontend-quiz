import { combineReducers } from "redux"
import quizzReducer from "./quizzReducer"

const rootReducer = combineReducers({
  quizz: quizzReducer,
})

export default rootReducer
