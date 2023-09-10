import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "../modules/reducers"

const store = configureStore({
  reducer: rootReducer,
})

export default store
