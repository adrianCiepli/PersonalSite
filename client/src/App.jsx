import { useState } from 'react'
import Desktop from './Desktop.jsx';
import Taskbar from './Taskbar.jsx';
import WindowContextComponent from './contexts/WindowContext.jsx';
import './css/App.css'

function App() {
  // Window could also be honestly more appropriately named a 'Process'
  const [activeWindows, setActiveWindows] = useState([]); // Stores {index: <Int>, appStr: <String>}
  const [activeErrors, setActiveErrors] = useState([]); // Stores {error: <String>,errorText: <String>}
  const [focusedWindow, setFocusedWindow] = useState(null);

  return (
    <div className='App'>
      <WindowContextComponent activeWindows={activeWindows} setActiveWindows={setActiveWindows} activeErrors={activeErrors} setActiveErrors={setActiveErrors}>
        <Desktop />
        <Taskbar />
      </WindowContextComponent>
    </div>
  )
}

export default App
