import { useState } from 'react'
import Desktop from './Desktop.jsx';
import Taskbar from './Taskbar.jsx';
import Window from './Window.jsx';
import './css/App.css'

function App() {
  const [openApps, setOpenApps] = useState([]);

  return (
    <div className='App'>
      <Desktop openApps={openApps} setOpenApps={setOpenApps} />
      <Taskbar openApps={openApps} setOpenApps={setOpenApps} />
    </div>
  )
}

export default App
