import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import SelectionPage from "./pages/SelectionPage"
import QuizzPage from "./pages/QuizzPage"

const App = () => {
  return (
    <div className='app-container'>
      <header>
        <h1 className='app-title'>QuizzLand</h1>
      </header>
      <div className='page-container'>
        <Router>
          <Routes>
            <Route exact path='/' element={<SelectionPage />}></Route>
            <Route exact path='/quizz' element={<QuizzPage />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
