import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import SelectionPage from "./pages/SelectionPage"
import Quizz from "./components/Quizz"

const App = () => {
  return (
    <div className='app-container'>
      <h1 className='app-title'>QuizzLand</h1>
      <Router>
        <Routes>
          <Route exact path='/' element={<SelectionPage />}></Route>
          <Route exact path='/quizz' element={<Quizz />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
