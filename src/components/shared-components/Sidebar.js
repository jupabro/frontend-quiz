import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Navigation from "./Navigation"
import "./Sidebar.css"

function Sidebar() {
  const sidebarRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(260)

  const startResizing = useCallback(() => {
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        )
      }
    },
    [isResizing]
  )

  useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  return (
    <div className='app-sidebar' onMouseDown={(e) => e.preventDefault()}>
      <div
        ref={sidebarRef}
        className={`sidebar ${isResizing ? "resizing" : ""}`}
        style={{ "--sidebar-width": `${sidebarWidth}px` }}
      >
        <Navigation />
      </div>
      <div className='resizer' onMouseDown={startResizing}></div>
    </div>
  )
}

export default Sidebar
