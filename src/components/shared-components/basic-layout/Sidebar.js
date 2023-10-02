import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Navigation from "./Navigation"
import "./Sidebar.css"

function Sidebar() {
  const sidebarRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(260)
  const minResizeWidth = 170
  const shrinkWidth = 70

  const startResizing = useCallback(() => {
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        const newWidth =
          mouseMoveEvent.clientX -
          sidebarRef.current.getBoundingClientRect().left

        const widthChange = newWidth - sidebarWidth

        if (widthChange < 0 && newWidth < minResizeWidth) {
          // if movement is from right to left, shrink
          setSidebarWidth(shrinkWidth)
        } else if (widthChange > 0 && newWidth < minResizeWidth) {
          // if movement is from left to right, grow slightly over the threshold
          setSidebarWidth(minResizeWidth + 1)
        } else setSidebarWidth(newWidth)
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
        <Navigation sidebarWidth={sidebarWidth} shrinkWidth={shrinkWidth} />
      </div>
      <div className='resizer' onMouseDown={startResizing}></div>
    </div>
  )
}

export default Sidebar
