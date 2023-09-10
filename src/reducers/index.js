import { combineReducers } from "redux"
import selectionReducer from "./selectionReducer"
import quizzReducer from "./quizzReducer"

const rootReducer = combineReducers({
  selection: selectionReducer,
  quizz: quizzReducer,
})

export default rootReducer
