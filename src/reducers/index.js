import { combineReducers } from "redux"
import selectionReducer from "./selectionReducer" 

const rootReducer = combineReducers({
  selection: selectionReducer, 
  // Other reducers if needed
})

export default rootReducer
