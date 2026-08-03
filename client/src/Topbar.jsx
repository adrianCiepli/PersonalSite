import { useState } from "react";
import './css/Topbar.css';

function Topbar() {
    return (
        <div className="Topbar">
            <p className="window-name">Window</p>
            <div className="button-area">
                <span className="minimize-button">_</span>
                <span className="maximize-button">🗖</span>
                <span className="close-button">X</span>
            </div>
        </div>
    );
}


export default Topbar;