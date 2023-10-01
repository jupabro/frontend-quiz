import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import SelectionPage from "./pages/SelectionPage"
import QuizzPage from "./pages/QuizzPage"
import Footer from "./components/shared-components/basic-layout/Footer"
import Sidebar from "./components/shared-components/basic-layout/Sidebar"
import AuthModal from "./components/shared-components/login-signup/AuthModal"

const App = () => {
  return (
    <div className='app-container'>
      <Sidebar />
      <AuthModal />
      <div className='app-main'>
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
      <Footer />
    </div>
  )
}

export default App
