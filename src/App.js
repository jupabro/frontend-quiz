import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import SelectionPage from "./pages/SelectionPage"
import QuizzPage from "./pages/QuizzPage"
import Footer from "./components/shared-components/Footer"
import Sidebar from "./components/shared-components/Sidebar"

const App = () => {
  return (
    <div className='app-container'>
      <Sidebar />
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

// import React from "react"
// import { useState, useEffect, useRef } from "react"
// import "./App.css"

// function App() {
//   const sidebarRef = useRef(null)
//   const [isResizing, setIsResizing] = useState(false)
//   const [sidebarWidth, setSidebarWidth] = useState(268)

//   const startResizing = React.useCallback((mouseDownEvent) => {
//     setIsResizing(true)
//   }, [])

//   const stopResizing = React.useCallback(() => {
//     setIsResizing(false)
//   }, [])

//   const resize = React.useCallback(
//     (mouseMoveEvent) => {
//       if (isResizing) {
//         setSidebarWidth(
//           mouseMoveEvent.clientX -
//             sidebarRef.current.getBoundingClientRect().left
//         )
//       }
//     },
//     [isResizing]
//   )

//   React.useEffect(() => {
//     window.addEventListener("mousemove", resize)
//     window.addEventListener("mouseup", stopResizing)
//     return () => {
//       window.removeEventListener("mousemove", resize)
//       window.removeEventListener("mouseup", stopResizing)
//     }
//   }, [resize, stopResizing])

//   return (
//     <div className='app-container'>
//       <div
//         ref={sidebarRef}
//         className='app-sidebar'
//         style={{ width: sidebarWidth }}
//         onMouseDown={(e) => e.preventDefault()}
//       >
//         <div className='app-sidebar-content' />
//         <div className='app-sidebar-resizer' onMouseDown={startResizing} />
//       </div>
//       <div className='app-frame' />
//     </div>
//   )
// }

// export default App
