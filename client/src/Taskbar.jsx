import "./css/Taskbar.css";
import { useState, useEffect } from "react";
import windows_icon from './assets/windows_icon.png';
import Tray from './Tray.jsx';
import TaskbarIcon from "./TaskbarIcon.jsx";

function Taskbar({ activeWindows, setActiveWindows, activeErrors, setactiveErrors }) {
    const pinnedApps = ['Explorer'];

    const handleClick = () => {
        if (activeWindows.length >= MAXWINDOWS) {
            const newArr = [... activeErrors, {error: 1, errorText: `Your RAM is too teeny-tiny, you can only have ${MAXWINDOWS} active window(s) at once.`}];
            setactiveErrors(newArr);
        } else {
            const newArr = [... activeWindows, {index: activeWindows.length, appStr: appStr}];
            setActiveWindows(newArr);
        }
    };
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
                    return <TaskbarIcon key={i} appStr={window.appStr} pinned={false} handleClick={handleClick} />
                })}
            </div>

            <Tray />
        </div>
    );
}


export default Taskbar;