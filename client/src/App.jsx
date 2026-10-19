import { useState } from 'react'
import Desktop from './Desktop.jsx';
import Taskbar from './Taskbar.jsx';
import WindowContextComponent from './contexts/WindowContext.jsx';
import './css/App.css'

function App() {
  const [focusedWindow, setFocusedWindow] = useState(null);

  return (
    <div className='App'>
      <WindowContextComponent>
        <Desktop />
        <Taskbar />
      </WindowContextComponent>
    </div>
  )
}

export default App
