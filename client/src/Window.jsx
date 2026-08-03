import { useState, useEffect, useRef } from "react";
import Topbar from './Topbar.jsx';
import './css/Window.css'


function Window() {
    return (
        <div className="Window" tabIndex={1}>
            <Topbar />
            <div className="content-border">
                <div className="content-area">

                </div>
            </div>
        </div>
    );
}


export default Window;