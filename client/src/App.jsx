import { useState } from 'react'
import Desktop from './Desktop.jsx';
import Taskbar from './Taskbar.jsx';
import Window from './Window.jsx';
import './css/App.css'

function App() {


  return (
    <>
      <Desktop />
      <Window />
      <Taskbar />
    </>
  )
}

export default App
