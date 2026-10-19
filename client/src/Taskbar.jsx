import "./css/Taskbar.css";
import { useState, useEffect, useContext } from "react";
import { WindowContext } from './contexts/WindowContext.jsx'
import windows_icon from './assets/windows_icon.png';
import Tray from './Tray.jsx';
import TaskbarIcon from "./TaskbarIcon.jsx";

function Taskbar({  }) {
    const pinnedApps = ['Explorer'];
    const { activeWindows, openWindow } = useContext(WindowContext);

    return (
        <div className="Taskbar">
            <div className="start button">
                <img src={windows_icon} />
                <p>start</p>
            </div>

            <div className="app-tray">
                {pinnedApps.map((pinnedApp, i) => {
                    return <TaskbarIcon key={i} appStr={pinnedApp} pinned={true} />
                })}
                {activeWindows.map((window, i) => {
                    return <TaskbarIcon key={i} appStr={window.appStr} pinned={false} handleClick={() => {openWindow(window.appStr)}} />
                })}
            </div>

            <Tray />
        </div>
    );
}


export default Taskbar;