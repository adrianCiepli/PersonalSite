import "./css/Taskbar.css";
import { useState, useEffect } from "react";
import windows_icon from './assets/windows_icon.png';
import Tray from './Tray.jsx';

function Taskbar({ openApps, setOpenApps }) {
    const pinnedApps = [];

    return (
        <div className="Taskbar">
            <div className="start button">
                <img src={windows_icon} />
                <p>start</p>
            </div>

            <div className="app-tray">
                
            </div>

            <Tray />
        </div>
    );
}


export default Taskbar;