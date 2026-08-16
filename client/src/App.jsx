import { useState } from 'react'
import Desktop from './Desktop.jsx';
import Taskbar from './Taskbar.jsx';
import Window from './Window.jsx';
import './css/App.css'

function App() {
  // Window could also be honestly more appropriately named a 'Process'
  const [activeWindows, setActiveWindows] = useState([]); // Stores {index: <Int>, appStr: <String>}
  const [activeErrors, setactiveErrors] = useState([]); // Stores {error: <String>,errorText: <String>}
  const [focusedWindow, setFocusedWindow] = useState(null);

  return (
    <>
      <Desktop activeWindows={activeWindows} setActiveWindows={setActiveWindows} 
          activeErrors={activeErrors} setactiveErrors={setactiveErrors} />
      <Taskbar activeWindows={activeWindows} setActiveWindows={setActiveWindows} 
        activeErrors={activeErrors} setactiveErrors={setactiveErrors} />
    </>
  )
}

export default App
